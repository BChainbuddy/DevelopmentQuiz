import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios", () => ({ default: { post: vi.fn() } }));

import axios from "axios";
import { fetchQuestions } from "../openai";

const post = vi.mocked(axios.post);

/** Wraps a payload the way the chat-completions endpoint would. */
function modelResponse(
  payload: unknown,
  opts: { finish_reason?: string; refusal?: string | null } = {}
) {
  return {
    data: {
      choices: [
        {
          message: {
            content:
              opts.refusal === undefined ? JSON.stringify(payload) : null,
            refusal: opts.refusal ?? null,
          },
          finish_reason: opts.finish_reason ?? "stop",
        },
      ],
    },
  };
}

function question(n: number) {
  return {
    question: `Question text ${n}?`,
    answers: [`answer ${n}a`, `answer ${n}b`, `answer ${n}c`],
    correctAnswer: "B",
  };
}

const oneValid = { questions: [question(1)] };
const tenValid = { questions: Array.from({ length: 10 }, (_, i) => question(i)) };

/** The messages array sent on the Nth call (0-indexed). */
function messagesOnCall(n: number) {
  return (post.mock.calls[n][1] as { messages: { role: string; content: string }[] })
    .messages;
}

function bodyOnCall(n: number) {
  return post.mock.calls[n][1] as Record<string, any>;
}

beforeEach(() => {
  post.mockReset();
  process.env.OPENAI_API_KEY = "test-key";
});

describe("fetchQuestions - happy path", () => {
  it("returns a single object (not an array) when count is 1", async () => {
    post.mockResolvedValueOnce(modelResponse(oneValid) as any);

    const result = await fetchQuestions("sys prompt", 1);

    expect(Array.isArray(result)).toBe(false);
    expect(result).toEqual(question(1));
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("returns an array of exactly `count` questions for a batch", async () => {
    post.mockResolvedValueOnce(modelResponse(tenValid) as any);

    const result = await fetchQuestions("sys prompt", 10);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(10);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("requests schema-enforced decoding, not prompt-instructed JSON", async () => {
    post.mockResolvedValueOnce(modelResponse(oneValid) as any);
    await fetchQuestions("sys prompt", 1);

    const body = bodyOnCall(0);
    expect(body.response_format.type).toBe("json_schema");
    expect(body.response_format.json_schema.strict).toBe(true);

    const itemSchema =
      body.response_format.json_schema.schema.properties.questions.items;
    expect(itemSchema.properties.correctAnswer.enum).toEqual(["A", "B", "C"]);
    expect(itemSchema.additionalProperties).toBe(false);
    expect(itemSchema.required).toEqual([
      "question",
      "answers",
      "correctAnswer",
    ]);

    // json_schema decoding is unavailable on gpt-3.5-turbo.
    expect(body.model).not.toBe("gpt-3.5-turbo");
  });

  it("passes the caller's prompt through as the system message", async () => {
    post.mockResolvedValueOnce(modelResponse(oneValid) as any);
    await fetchQuestions("you are a Python quiz generator", 1);

    const [system, user] = messagesOnCall(0);
    expect(system).toEqual({
      role: "system",
      content: "you are a Python quiz generator",
    });
    expect(user.role).toBe("user");
    expect(user.content).toMatch(/exactly 1 question/);
  });
});

describe("fetchQuestions - content cleanup the schema cannot enforce", () => {
  it("strips leaked 'Question N:' prefixes and letter prefixes", async () => {
    post.mockResolvedValueOnce(
      modelResponse({
        questions: [
          {
            question: "Question 3: What is a closure?",
            answers: ["A) first", "B. second", "C: third"],
            correctAnswer: "C",
          },
        ],
      }) as any
    );

    const result = (await fetchQuestions("sys", 1)) as any;

    expect(result.question).toBe("What is a closure?");
    expect(result.answers).toEqual(["first", "second", "third"]);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("rejects an answer that is nothing but a letter prefix (cleanup runs before validation)", async () => {
    const stripped = {
      questions: [{ ...question(1), answers: ["real answer", "B)", "C)"] }],
    };
    post
      .mockResolvedValueOnce(modelResponse(stripped) as any)
      .mockResolvedValueOnce(modelResponse(oneValid) as any);

    const result = await fetchQuestions("sys", 1);

    expect(result).toEqual(question(1));
    expect(post).toHaveBeenCalledTimes(2);
    expect(messagesOnCall(1)[3].content).toMatch(/non-empty string/);
  });
});

describe("fetchQuestions - repair loop", () => {
  it("feeds validation problems back instead of re-sending the same prompt", async () => {
    const broken = {
      questions: [{ ...question(1), answers: ["a", "b", "c", "d"] }],
    };
    post
      .mockResolvedValueOnce(modelResponse(broken) as any)
      .mockResolvedValueOnce(modelResponse(oneValid) as any);

    const result = await fetchQuestions("sys", 1);

    expect(result).toEqual(question(1));
    expect(post).toHaveBeenCalledTimes(2);

    // The repair turn carries the model's own output back plus the problems.
    const second = messagesOnCall(1);
    expect(second).toHaveLength(4);
    expect(second[2].role).toBe("assistant");
    expect(second[2].content).toContain('"answers"');
    expect(second[3].role).toBe("user");
    expect(second[3].content).toMatch(/rejected by validation/);
    expect(second[3].content).toMatch(/exactly 3 entries, got 4/);

    // The first two messages are unchanged across the repair.
    expect(second.slice(0, 2)).toEqual(messagesOnCall(0));
  });

  it("tells the model the expected count when the batch is short", async () => {
    const short = { questions: tenValid.questions.slice(0, 9) };
    post
      .mockResolvedValueOnce(modelResponse(short) as any)
      .mockResolvedValueOnce(modelResponse(tenValid) as any);

    const result = await fetchQuestions("sys", 10);

    expect(result).toHaveLength(10);
    expect(messagesOnCall(1)[3].content).toMatch(
      /must contain exactly 10 entries, got 9/
    );
  });

  it("identifies which question in a batch is broken", async () => {
    const badThird = { questions: [...tenValid.questions] };
    badThird.questions[2] = { ...question(2), correctAnswer: "Z" };
    post
      .mockResolvedValueOnce(modelResponse(badThird) as any)
      .mockResolvedValueOnce(modelResponse(tenValid) as any);

    await fetchQuestions("sys", 10);

    expect(messagesOnCall(1)[3].content).toMatch(/\(question 3\)/);
  });

  it("gives up after a bounded number of attempts rather than looping", async () => {
    const broken = { questions: [{ ...question(1), correctAnswer: "D" }] };
    post.mockResolvedValue(modelResponse(broken) as any);

    await expect(fetchQuestions("sys", 1)).rejects.toThrow(
      /after 3 attempts/
    );
    expect(post).toHaveBeenCalledTimes(3);
  });

  it("repairs a response that is not valid JSON at all", async () => {
    post
      .mockResolvedValueOnce({
        data: {
          choices: [
            {
              message: { content: '{"questions": [', refusal: null },
              finish_reason: "stop",
            },
          ],
        },
      } as any)
      .mockResolvedValueOnce(modelResponse(oneValid) as any);

    const result = await fetchQuestions("sys", 1);

    expect(result).toEqual(question(1));
    expect(messagesOnCall(1)[3].content).toMatch(/not valid JSON/);
  });
});

describe("fetchQuestions - unrepairable failures fail fast", () => {
  it("throws on a refusal without burning repair attempts", async () => {
    post.mockResolvedValueOnce(
      modelResponse(null, { refusal: "I can't help with that" }) as any
    );

    await expect(fetchQuestions("sys", 1)).rejects.toThrow(/refused/);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("throws when the response was truncated", async () => {
    post.mockResolvedValueOnce(
      modelResponse(oneValid, { finish_reason: "length" }) as any
    );

    await expect(fetchQuestions("sys", 1)).rejects.toThrow(/truncated/);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("throws without calling the API when the key is missing", async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(fetchQuestions("sys", 1)).rejects.toThrow(/Missing API key/);
    expect(post).not.toHaveBeenCalled();
  });
});

describe("fetchQuestions - sampling parameters", () => {
  it("penalises repetition for single-shot generation only", async () => {
    post.mockResolvedValueOnce(modelResponse(oneValid) as any);
    await fetchQuestions("sys", 1);
    expect(bodyOnCall(0).presence_penalty).toBe(0.5);
    expect(bodyOnCall(0).frequency_penalty).toBe(0.5);

    post.mockResolvedValueOnce(modelResponse(tenValid) as any);
    await fetchQuestions("sys", 10);
    // The batch prompt handles variety itself via difficulty progression.
    expect(bodyOnCall(1).presence_penalty).toBe(0);
    expect(bodyOnCall(1).frequency_penalty).toBe(0);
    expect(bodyOnCall(1).max_tokens).toBeGreaterThan(bodyOnCall(0).max_tokens);
  });
});

import axios from "axios";
import {
  ANSWER_CHOICES,
  AnswerChoice,
  QuizQuestion,
  validateQuestion,
} from "./questionShape";

interface ChatGPTResponse {
  choices: {
    message: { content: string | null; refusal?: string | null };
    finish_reason: string;
  }[];
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/**
 * Structured outputs require a model that supports json_schema decoding;
 * gpt-3.5-turbo does not.
 */
const MODEL = "gpt-4o-mini";

/** Extra model calls allowed to repair an invalid response (so 1 + 2 = 3 max). */
const MAX_REPAIR_ATTEMPTS = 2;

/**
 * The shape is enforced by the decoder, not by instructions. `strict: true`
 * requires every property to be listed in `required` and additionalProperties
 * to be false. Array lengths are not expressible here, so "exactly 3 answers"
 * and "exactly `count` questions" remain runtime checks (see questionShape.ts).
 */
const QUESTIONS_JSON_SCHEMA = {
  name: "quiz_questions",
  strict: true,
  schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answers: { type: "array", items: { type: "string" } },
            correctAnswer: { type: "string", enum: [...ANSWER_CHOICES] },
          },
          required: ["question", "answers", "correctAnswer"],
          additionalProperties: false,
        },
      },
    },
    required: ["questions"],
    additionalProperties: false,
  },
} as const;

/**
 * Content-level rules the schema cannot express. Kept deliberately short:
 * everything structural is the decoder's job now.
 */
function buildContract(count: number): string {
  return `
Return ${count === 1 ? "exactly 1 question" : `exactly ${count} questions`} in the "questions" array.

- Each question must have exactly 3 entries in "answers", all distinct.
- "answers" holds answer text only. Do NOT include letter prefixes (A., B), C:, ...).
- Do NOT prefix the question text with "Question 1:" or similar.
- "correctAnswer" is the letter of the correct entry: A for the first, B for the second, C for the third.
`.trim();
}

function buildRepairMessage(problems: string[]): string {
  return `
Your previous response was rejected by validation:

${problems.map((p) => `- ${p}`).join("\n")}

Produce a corrected response that fixes every point above. Keep any content that was already valid.
`.trim();
}

async function callModel(
  messages: ChatMessage[],
  count: number
): Promise<string> {
  const { data } = await axios.post<ChatGPTResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: MODEL,
      messages,
      response_format: { type: "json_schema", json_schema: QUESTIONS_JSON_SCHEMA },
      // Headroom matters: a truncated response is invalid JSON, which costs a
      // whole repair attempt to recover from.
      max_tokens: count === 1 ? 700 : 3000,
      temperature: 1.0,
      presence_penalty: count === 1 ? 0.5 : 0.0,
      frequency_penalty: count === 1 ? 0.5 : 0.0,
      n: 1,
    },
    {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    }
  );

  const choice = data.choices?.[0];

  if (choice?.message?.refusal) {
    throw new Error(`Model refused the request: ${choice.message.refusal}`);
  }
  if (choice?.finish_reason === "length") {
    throw new Error("Model response was truncated before completion");
  }
  if (typeof choice?.message?.content !== "string") {
    throw new Error("Model returned no content");
  }

  return choice.message.content;
}

/**
 * Strips content-level leakage the schema cannot prevent: the model can still
 * write "Question 3: ..." or "B) ..." *inside* a string field.
 *
 * Runs before validation, so it must tolerate a payload that did not hold to
 * the schema at all (truncated body, or the non-strict JSON.parse fallback).
 * Anything unusable is coerced to a value validateQuestion will reject.
 */
function cleanItem(item: unknown): QuizQuestion {
  const record =
    typeof item === "object" && item !== null
      ? (item as Record<string, unknown>)
      : {};

  return {
    question:
      typeof record.question === "string"
        ? record.question.replace(/^Question\s*\d+:\s*/i, "").trim()
        : "",
    answers: Array.isArray(record.answers)
      ? record.answers.map((ans) =>
          typeof ans === "string"
            ? ans.replace(/^[A-C][\.\)\:\-]\s*/i, "").trim()
            : ""
        )
      : [],
    // Not trusted here; validateQuestion checks it against ANSWER_CHOICES.
    correctAnswer: record.correctAnswer as AnswerChoice,
  };
}

function collectProblems(parsed: unknown, count: number): string[] {
  if (typeof parsed !== "object" || parsed === null) {
    return ["Response was not a JSON object."];
  }

  const { questions } = parsed as Record<string, unknown>;

  if (!Array.isArray(questions)) {
    return ['Response is missing a "questions" array.'];
  }
  if (questions.length !== count) {
    return [
      `"questions" must contain exactly ${count} ${
        count === 1 ? "entry" : "entries"
      }, got ${questions.length}.`,
    ];
  }

  return questions.flatMap((item, i) =>
    validateQuestion(cleanItem(item), count === 1 ? undefined : i)
  );
}

/**
 * Fetches `count` questions from OpenAI with a schema-enforced response, then
 * validates the parts the schema cannot cover. On a validation failure the
 * problems are fed back to the model as a repair turn rather than re-sending
 * the identical prompt.
 *
 * Returns a single object when `count` is 1, an array otherwise.
 */
export async function fetchQuestions(
  prompt: string,
  count = 1
): Promise<QuizQuestion | QuizQuestion[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing API key");
  }

  const baseMessages: ChatMessage[] = [
    { role: "system", content: prompt },
    { role: "user", content: buildContract(count) },
  ];

  // Repair turns accumulate here; each attempt sends a freshly built array so
  // no request body is mutated after it has been sent.
  const repairTurns: ChatMessage[] = [];

  let lastProblems: string[] = [];

  for (let attempt = 0; attempt <= MAX_REPAIR_ATTEMPTS; attempt++) {
    const raw = await callModel([...baseMessages, ...repairTurns], count);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Should not happen under strict decoding, but a truncated or malformed
      // body is still repairable.
      lastProblems = ["Response was not valid JSON."];
      if (attempt < MAX_REPAIR_ATTEMPTS) {
        repairTurns.push(
          { role: "assistant", content: raw },
          { role: "user", content: buildRepairMessage(lastProblems) }
        );
      }
      continue;
    }

    const problems = collectProblems(parsed, count);

    if (problems.length === 0) {
      const questions = (parsed as { questions: QuizQuestion[] }).questions.map(
        cleanItem
      );
      return count === 1 ? questions[0] : questions;
    }

    lastProblems = problems;
    console.warn(
      `Invalid question payload (attempt ${attempt + 1}/${
        MAX_REPAIR_ATTEMPTS + 1
      }):`,
      problems
    );

    if (attempt < MAX_REPAIR_ATTEMPTS) {
      repairTurns.push(
        { role: "assistant", content: raw },
        { role: "user", content: buildRepairMessage(problems) }
      );
    }
  }

  throw new Error(
    `Failed to get a valid question payload after ${
      MAX_REPAIR_ATTEMPTS + 1
    } attempts: ${lastProblems.join(" ")}`
  );
}

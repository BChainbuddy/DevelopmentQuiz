import axios from "axios";

interface ChatGPTResponse {
  choices: { message: { content: string } }[];
}

type RawItem = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

/**
 * Fetches `count` questions from OpenAI, returns either a single item
 * or an array of items, cleaned of any prefixes and normalized.
 */
export async function fetchQuestions(
  prompt: string,
  count = 1
): Promise<RawItem | RawItem[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing API key");
  }

  const systemMessage = { role: "system", content: prompt };
  const userMessage = {
    role: "user",
    content: `
Please respond ONLY with ${
      count === 1 ? "a single JSON object" : `a JSON array of ${count} objects`
    } in this exact shape:

${
  count === 1
    ? `{
  "question": "<full question text>",
  "answers": ["<A>","<B>","<C>"],
  "correctAnswer": "<A|B|C>"
}`
    : `[
  {
    "question": "<full question text>",
    "answers": ["<A>","<B>","<C>"],
    "correctAnswer": "<A|B|C>"
  },
  … total ${count} entries …
]`
}

Do NOT wrap your response in markdown or triple‑backticks. Return raw JSON only.
`.trim(),
  };

  const { data } = await axios.post<ChatGPTResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      max_tokens: count === 1 ? 500 : 1000,
      temperature: 1.0,
      presence_penalty: count === 1 ? 0.5 : 0.0,
      frequency_penalty: count === 1 ? 0.5 : 0.0,
      n: 1,
    },
    {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    }
  );

  // 1) strip any ``` fences
  let raw = data.choices[0].message.content.trim();
  raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");

  // 2) parse JSON
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("Invalid JSON from OpenAI:", raw);
    throw new Error("Failed to parse OpenAI response as JSON");
  }

  // 3) helper to clean each question object
  function cleanItem(item: any): RawItem {
    // strip "Question N:" prefix
    const question = String(item.question || "")
      .replace(/^Question\s*\d+:\s*/i, "")
      .trim();

    // strip "A) ", "B) ", "C) " from each answer
    const answers = Array.isArray(item.answers)
      ? item.answers.map((ans: string) =>
          String(ans)
            .replace(/^[A-C]\)\s*/i, "")
            .trim()
        )
      : [];

    // extract first A/B/C letter from correctAnswer
    const match = String(item.correctAnswer || "")
      .toUpperCase()
      .match(/[ABC]/);
    const correctAnswer = match ? match[0] : "";

    return { question, answers, correctAnswer };
  }

  // 4) normalize array vs single
  if (Array.isArray(parsed)) {
    return parsed.map(cleanItem);
  } else {
    return cleanItem(parsed);
  }
}

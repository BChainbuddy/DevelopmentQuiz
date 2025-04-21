import axios from "axios";

interface ChatGPTResponse {
  choices: { message: { content: string } }[];
}

/**
 * Ask for `count` questions in JSON. Cleans out any
 * "Question N: " prefixes and "X) " answer labels.
 */
export async function fetchQuestions(
  prompt: string,
  count = 1
): Promise<
  | { question: string; answers: string[]; correctAnswer: string }
  | Array<{ question: string; answers: string[]; correctAnswer: string }>
> {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing API key");

  const systemMessage = { role: "system", content: prompt };
  const userMessage = {
    role: "user",
    content: `
Please respond ONLY with ${
      count === 1 ? "a single JSON object" : `a JSON array of ${count} objects`
    } in this shape:

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
`.trim(),
  };

  const { data } = await axios.post<ChatGPTResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      max_tokens: count === 1 ? 500 : 1000,
      temperature: 1.0,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
      n: 1,
    },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
  );

  const raw = data.choices[0].message.content.trim();
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON from OpenAI:", raw);
    throw new Error("Failed to parse OpenAI response as JSON");
  }

  // helper to strip prefixes
  function cleanItem(item: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }) {
    return {
      question: item.question.replace(/^Question\s*\d+:\s*/i, "").trim(),
      answers: item.answers.map((ans) =>
        ans.replace(/^[A-C]\)\s*/i, "").trim()
      ),
      correctAnswer: item.correctAnswer.trim().toUpperCase(),
    };
  }

  if (Array.isArray(parsed)) {
    return parsed.map(cleanItem);
  } else {
    return cleanItem(parsed);
  }
}

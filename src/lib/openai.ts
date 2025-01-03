import axios from "axios";

interface ChatGPTChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatGPTChoice[];
}

export async function fetchQuestions() {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key.");
  }

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful quiz generator. Provide short, easy questions from the web development field with 3 multiple-choice answers.",
      },
      {
        role: "user",
        content:
          "Get me one relevant question and 3 multiple choice answers from the web development field. The question should be easy.",
      },
    ],
    max_tokens: 100, // limit the length of the response
    temperature: 0.7, // creativity level
    n: 1, // number of answers to generate
  };

  try {
    const response = await axios.post<ChatGPTResponse>(apiUrl, requestBody, {
      headers,
    });

    return response;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

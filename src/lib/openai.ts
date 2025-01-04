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
          "You are a helpful software development quiz generator. Provide unique specific easy to hard question from any topic in the field of web development field with exactly three multiple-choice answers, the question should be very technical as is targeted towards developers looking for a job.",
      },
      {
        role: "user",
        content: `Please format the response exactly as shown below, without any additional text or explanations:
  
  Question: [Your Question Here]
  
  A) [Answer Choice A]
  B) [Answer Choice B]
  C) [Answer Choice C]
  
  Correct answer: [A/B/C]`,
      },
    ],
    max_tokens: 500, // Increased to ensure response completeness
    temperature: 0.9, // Lowered for more deterministic outputs
    n: 1, // Number of responses to generate
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

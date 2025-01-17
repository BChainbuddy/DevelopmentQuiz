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

export async function fetchQuestions(prompt: string) {
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
        content: prompt,
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
    temperature: 1.2, // randomness
    presence_penalty: 0.5, // encourages new topics
    frequency_penalty: 0.5, // discourages repetition
    n: 1,
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

export function createSystemPrompt(topic: string, subtopics: string[]): string {
  return `
You are a helpful software development quiz generator. 
Generate ONE unique and very specific question in the field of ${topic}. 
It should range from easy to advanced. 
Choose from a variety of subtopics such as: ${subtopics.join(", ")}.
Avoid repeating the same question or focusing solely on the basics. 
Ensure exactly THREE multiple-choice answers. 
These questions should be technical, targeted at developers applying for jobs.
  `.trim();
}

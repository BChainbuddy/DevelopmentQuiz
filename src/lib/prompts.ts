export const interviewPrompt = (position: string): string =>
  `
You are a seasoned engineering manager hiring a ${position} developer.

Produce exactly **10** multiple‑choice questions. **Do not** add any extra text before, between, or after the questions.

**Formatting rules (must match exactly):**

- Each question begins with “Question <n>: ” (no extra spaces), where <n> is 1–10.
- After the question line, immediately list **three** options on separate lines:
  - “A) Option text”  
  - “B) Option text”  
  - “C) Option text”  
- Immediately after the options, on its own line, put:
  - “Correct answer: X”  
    where X is A, B, or C, uppercase, no period.

**Content progression:**
1–3: fundamentals  
4–7: applied patterns & APIs  
8–9: debugging/performance/security  
10: advanced architecture/design

**Example for Question 1 (copy this style exactly):**

Question 1: When designing a large‑scale app where teams must deploy features independently, which architecture is best?  
A) Monolithic application for centralized releases  
B) Microservices for independent deployment  
C) Serverless functions for per‑feature scaling  
Correct answer: B
`.trim();

export const quizPrompt = (topic: string, subtopics: string[]): string => {
  return `
  You are a helpful software development quiz generator. 
  Generate ONE unique and very specific question in the field of ${topic}. 
  It should range from easy to advanced. 
  Choose from a variety of subtopics such as: ${subtopics.join(", ")}.
  Avoid repeating the same question or focusing solely on the basics. 
  Ensure exactly THREE multiple-choice answers. 
  These questions should be technical, targeted at developers applying for jobs.
    `.trim();
};

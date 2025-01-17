import { createSystemPrompt } from "@/lib/openai";

export const categories = [
  {
    name: "Web development",
    prompt: createSystemPrompt("Web development", [
      "HTML5",
      "CSS3",
      "JavaScript",
      "performance",
      "security",
      "frameworks",
      "accessibility",
    ]),
  },
  {
    name: "Python",
    prompt: createSystemPrompt("Python", [
      "data structures",
      "concurrency",
      "frameworks (Django/Flask)",
      "debugging",
      "algorithmic challenges",
    ]),
  },
  {
    name: "Javascript",
    prompt: createSystemPrompt("JavaScript", [
      "ES6+ features",
      "async/await",
      "DOM manipulation",
      "Node.js",
      "event loop",
    ]),
  },
  {
    name: "AI",
    prompt: createSystemPrompt("AI", [
      "machine learning",
      "deep learning",
      "neural networks",
      "NLP",
      "computer vision",
    ]),
  },
  {
    name: "Data science",
    prompt: createSystemPrompt("Data science", [
      "statistics",
      "data analysis",
      "Pandas",
      "NumPy",
      "model evaluation",
    ]),
  },
  {
    name: "Blockchain",
    prompt: createSystemPrompt("Blockchain", [
      "smart contracts",
      "cryptography",
      "consensus mechanisms",
      "Ethereum",
      "solidity",
    ]),
  },
  {
    name: "Frontend",
    prompt: createSystemPrompt("Frontend development", [
      "React",
      "Vue",
      "bundling/performance",
      "CSS architecture",
      "accessibility",
    ]),
  },
  {
    name: "Backend",
    prompt: createSystemPrompt("Backend development", [
      "APIs",
      "databases",
      "authentication",
      "Node.js or Python",
      "scalability",
    ]),
  },
];

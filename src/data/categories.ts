import { quizPrompt } from "@/lib/prompts";

export const categories = [
  {
    name: "Web development",
    prompt: quizPrompt("Web development", [
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
    prompt: quizPrompt("Python", [
      "data structures",
      "concurrency",
      "frameworks (Django/Flask)",
      "debugging",
      "algorithmic challenges",
    ]),
  },
  {
    name: "Javascript",
    prompt: quizPrompt("JavaScript", [
      "ES6+ features",
      "async/await",
      "DOM manipulation",
      "Node.js",
      "event loop",
    ]),
  },
  {
    name: "AI",
    prompt: quizPrompt("AI", [
      "machine learning",
      "deep learning",
      "neural networks",
      "NLP",
      "computer vision",
    ]),
  },
  {
    name: "Data science",
    prompt: quizPrompt("Data science", [
      "statistics",
      "data analysis",
      "Pandas",
      "NumPy",
      "model evaluation",
    ]),
  },
  {
    name: "Blockchain",
    prompt: quizPrompt("Blockchain", [
      "smart contracts",
      "cryptography",
      "consensus mechanisms",
      "Ethereum",
      "solidity",
    ]),
  },
  {
    name: "Frontend",
    prompt: quizPrompt("Frontend development", [
      "React",
      "Vue",
      "bundling/performance",
      "CSS architecture",
      "accessibility",
    ]),
  },
  {
    name: "Backend",
    prompt: quizPrompt("Backend development", [
      "APIs",
      "databases",
      "authentication",
      "Node.js or Python",
      "scalability",
    ]),
  },
];

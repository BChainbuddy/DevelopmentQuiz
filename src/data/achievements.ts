export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type: "wins" | "games" | "accuracy" | "streak" | "category_wins";
    value: number;
    category?: string;
  };
}

export const achievements: Achievement[] = [
  {
    id: "first_win",
    name: "First Blood",
    description: "Win your first quiz",
    icon: "🎯",
    requirement: { type: "wins", value: 1 },
  },
  {
    id: "ten_wins",
    name: "Getting Good",
    description: "Win 10 quizzes",
    icon: "🔥",
    requirement: { type: "wins", value: 10 },
  },
  {
    id: "fifty_wins",
    name: "Quiz Master",
    description: "Win 50 quizzes",
    icon: "👑",
    requirement: { type: "wins", value: 50 },
  },
  {
    id: "hundred_wins",
    name: "Legend",
    description: "Win 100 quizzes",
    icon: "🏆",
    requirement: { type: "wins", value: 100 },
  },
  {
    id: "ten_games",
    name: "Dedicated",
    description: "Play 10 games",
    icon: "📚",
    requirement: { type: "games", value: 10 },
  },
  {
    id: "fifty_games",
    name: "Committed",
    description: "Play 50 games",
    icon: "💪",
    requirement: { type: "games", value: 50 },
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Achieve 80% accuracy with 20+ games",
    icon: "✨",
    requirement: { type: "accuracy", value: 80 },
  },
  {
    id: "js_expert",
    name: "JS Expert",
    description: "Win 10 JavaScript quizzes",
    icon: "💛",
    requirement: { type: "category_wins", value: 10, category: "JavaScript" },
  },
  {
    id: "python_expert",
    name: "Python Expert",
    description: "Win 10 Python quizzes",
    icon: "🐍",
    requirement: { type: "category_wins", value: 10, category: "Python" },
  },
  {
    id: "react_expert",
    name: "React Expert",
    description: "Win 10 React quizzes",
    icon: "⚛️",
    requirement: { type: "category_wins", value: 10, category: "React" },
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

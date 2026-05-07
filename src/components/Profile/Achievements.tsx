"use client";

import { achievements, Achievement } from "@/data/achievements";

interface AchievementsProps {
  unlockedIds: string[];
  totalWins: number;
  totalGames: number;
  accuracy: number;
  categoryStats: { categoryName: string; wins: number }[];
}

export default function Achievements({
  unlockedIds,
  totalWins,
  totalGames,
  accuracy,
  categoryStats,
}: AchievementsProps) {
  const getProgress = (achievement: Achievement): number => {
    const { type, value, category } = achievement.requirement;

    switch (type) {
      case "wins":
        return Math.min((totalWins / value) * 100, 100);
      case "games":
        return Math.min((totalGames / value) * 100, 100);
      case "accuracy":
        if (totalGames < 20) return (totalGames / 20) * 50; // Need 20 games first
        return Math.min((accuracy / value) * 100, 100);
      case "category_wins":
        const catStat = categoryStats.find((c) => c.categoryName === category);
        return Math.min(((catStat?.wins || 0) / value) * 100, 100);
      default:
        return 0;
    }
  };

  const isUnlocked = (id: string) => unlockedIds.includes(id);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {achievements.map((achievement) => {
        const unlocked = isUnlocked(achievement.id);
        const progress = getProgress(achievement);

        return (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-xl border transition-all duration-200 ${
              unlocked
                ? "bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500/30"
                : "bg-[var(--card-bg)] border-[var(--card-border)] opacity-60"
            }`}
          >
            {/* Icon */}
            <div className="text-3xl mb-2">{achievement.icon}</div>

            {/* Name */}
            <p className="text-sm font-medium truncate">{achievement.name}</p>

            {/* Description */}
            <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
              {achievement.description}
            </p>

            {/* Progress bar (only if not unlocked) */}
            {!unlocked && (
              <div className="mt-3">
                <div className="h-1 bg-[var(--card-bg-hover)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--muted-foreground)] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">{Math.round(progress)}%</p>
              </div>
            )}

            {/* Unlocked badge */}
            {unlocked && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import CategoryBreakdown from "./CategoryBreakdown";
import Achievements from "./Achievements";
import { categories as quizCategories } from "@/data/categories";

const quizCategoryNames = quizCategories.map((c) => c.name);

interface CategoryStat {
  categoryName: string;
  wins: number;
  losses: number;
}

interface ProfileData {
  categories: CategoryStat[];
  totals: { wins: number; losses: number };
  bestCategory: {
    name: string;
    winRate: string;
    wins: number;
    losses: number;
  } | null;
}

interface ProfileDashboardProps {
  profile: { username: string; public: boolean } | null;
  userName: string;
  userEmail: string;
}

export default function ProfileDashboard({
  profile,
  userName,
  userEmail,
}: ProfileDashboardProps) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    fetch(`/api/usergames/${profile.username}/all`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, [profile]);

  // Separate quiz categories from interview results
  const quizStats = data?.categories.filter((c) =>
    quizCategoryNames.includes(c.categoryName)
  ) ?? [];
  const interviewStats = data?.categories.filter(
    (c) => !quizCategoryNames.includes(c.categoryName)
  ) ?? [];

  const totalGames = data ? data.totals.wins + data.totals.losses : 0;
  const accuracy =
    totalGames > 0
      ? ((data!.totals.wins / totalGames) * 100).toFixed(1)
      : "0.0";
  const ratio =
    data?.totals.wins && data?.totals.losses
      ? (data.totals.wins / data.totals.losses).toFixed(2)
      : data?.totals.wins
      ? data.totals.wins.toString()
      : "0";

  // Get initials for avatar
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(120px,auto)]">
      {/* Profile Card - spans 2 cols, 2 rows on desktop */}
      <div className="col-span-2 row-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 backdrop-blur-sm flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-xl font-bold text-black">
            {initials}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
              Welcome back
            </p>
            <p className="text-xl font-semibold truncate">{userName}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{totalGames}</p>
              <p className="text-xs text-[var(--muted)] uppercase">Games</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs text-[var(--muted)] uppercase">Accuracy</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--card-border)] mt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-2 text-sm font-medium rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] transition-all"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Win/Loss Ratio - Large feature card */}
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-[var(--card-bg-hover)] to-[var(--card-bg)] border border-[var(--card-border-hover)] rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center">
        <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
          Win/Loss Ratio
        </p>
        <p className="text-7xl font-bold">{ratio}</p>
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {data?.totals.wins ?? 0}
            </p>
            <p className="text-xs text-[var(--muted)]">Wins</p>
          </div>
          <div className="w-px bg-[var(--card-border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {data?.totals.losses ?? 0}
            </p>
            <p className="text-xs text-[var(--muted)]">Losses</p>
          </div>
        </div>
      </div>

      {/* Best Category */}
      <div className="col-span-2 row-span-1 bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
          🏆
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
            Best Category
          </p>
          {data?.bestCategory ? (
            <>
              <p className="text-lg font-semibold truncate">
                {data.bestCategory.name}
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {data.bestCategory.winRate}% win rate
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--muted)]">Play 3+ games to unlock</p>
          )}
        </div>
      </div>

      {/* Quick Stats - Wins */}
      <div className="col-span-1 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-sm flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-emerald-400">
          {data?.totals.wins ?? 0}
        </p>
        <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mt-1">
          Total Wins
        </p>
      </div>

      {/* Quick Stats - Losses */}
      <div className="col-span-1 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 backdrop-blur-sm flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-red-400">
          {data?.totals.losses ?? 0}
        </p>
        <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mt-1">
          Total Losses
        </p>
      </div>

      {/* Quiz Category Breakdown */}
      <div className="col-span-2 md:col-span-4 lg:col-span-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 backdrop-blur-sm">
        <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
          Quiz Stats by Category
        </p>
        {loading ? (
          <div className="flex items-center justify-center h-32 text-[var(--muted)]">
            Loading...
          </div>
        ) : quizStats.length > 0 ? (
          <CategoryBreakdown categories={quizStats} />
        ) : (
          <div className="flex items-center justify-center h-24 text-[var(--muted)]">
            No quiz games played yet
          </div>
        )}
      </div>

      {/* Interview History */}
      {interviewStats.length > 0 && (
        <div className="col-span-2 md:col-span-4 lg:col-span-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
            Interview Practice History
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {interviewStats.map((interview) => {
              const total = interview.wins + interview.losses;
              const score = total > 0 ? Math.round((interview.wins / total) * 100) : 0;
              return (
                <div
                  key={interview.categoryName}
                  className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4"
                >
                  <p className="font-medium text-sm truncate mb-2">
                    {interview.categoryName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>{total} questions</span>
                    <span className={score >= 70 ? "text-emerald-400" : score >= 40 ? "text-amber-400" : "text-red-400"}>
                      {score}% correct
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements - Full width */}
      <div className="col-span-2 md:col-span-4 lg:col-span-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 backdrop-blur-sm">
        <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
          Achievements
        </p>
        <Achievements
          unlockedIds={[]}
          totalWins={quizStats.reduce((sum, c) => sum + c.wins, 0)}
          totalGames={quizStats.reduce((sum, c) => sum + c.wins + c.losses, 0)}
          accuracy={
            quizStats.reduce((sum, c) => sum + c.wins + c.losses, 0) > 0
              ? (quizStats.reduce((sum, c) => sum + c.wins, 0) /
                  quizStats.reduce((sum, c) => sum + c.wins + c.losses, 0)) *
                100
              : 0
          }
          categoryStats={quizStats}
        />
      </div>
    </div>
  );
}

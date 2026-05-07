"use client";

import { useEffect, useState } from "react";
import Stat from "./Stat";
import CategoryDropdown from "./CategoryDropdown";

export interface StatsData {
  wins: number;
  losses: number;
}

export default function Stats({
  profile,
}: {
  profile: {
    username: string;
    public: boolean;
  } | null;
}) {
  const [category, setCategory] = useState<string>("All");
  const [stats, setStats] = useState<StatsData>({ wins: 0, losses: 0 });

  useEffect(() => {
    if (!profile) return;

    const url = `/api/usergames/${profile.username}/${category}`;

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, [profile, category]);

  const totalGames = stats.wins + stats.losses;
  const accuracy =
    totalGames > 0 ? ((stats.wins / totalGames) * 100).toFixed(1) : "0.0";
  const ratio =
    stats.wins && stats.losses
      ? (stats.wins / stats.losses).toFixed(2)
      : stats?.wins
      ? stats.wins.toString()
      : "0";

  return (
    <div className="flex flex-col gap-y-6">
      {/* Category selector */}
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-medium opacity-60">Category:</p>
        <CategoryDropdown setCategory={setCategory} />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ratio - featured */}
        <div className="col-span-2 lg:col-span-1 lg:row-span-2 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center justify-center">
          <p className="text-xs font-medium opacity-50 uppercase tracking-wider mb-2">
            Win/Loss Ratio
          </p>
          <p className="lg:text-6xl md:text-5xl text-4xl font-bold">{ratio}</p>
        </div>

        <Stat label="Total Games" data={totalGames} />
        <Stat label="Accuracy" data={`${accuracy}%`} />
        <Stat label="Wins" data={stats.wins} color="emerald" />
        <Stat label="Losses" data={stats.losses} color="red" />
      </div>
    </div>
  );
}

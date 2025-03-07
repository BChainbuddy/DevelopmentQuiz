"use client";

import { useEffect, useState } from "react";
import Stat from "./Stat";
import Ratio from "./Ratio";

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
  const [category, setCategory] = useState<string>("all");
  const [stats, setStats] = useState<StatsData>({ wins: 0, losses: 0 });

  useEffect(() => {
    if (!profile) return;

    const url =
      category === "all"
        ? `/api/usergames?username=${profile.username}`
        : `/api/usergames?username=${profile.username}&category=${category}`;

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, [profile, category]);

  return (
    <>
      <div>
        <div></div>
      </div>
      <div className="flex md:flex-row flex-col md:justify-around justify-evenly items-center gap-y-[10vh]">
        <Stat label="Wins" data={stats.wins} />
        <Ratio data={stats} />
        <Stat label="Losses" data={stats.losses} />
      </div>
    </>
  );
}

const CategoryDropdown = () => {
  return (
    <div>
      <select className="w-40 h-10 bg-gray-200 rounded-md">
        <option value="all">All</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
        <option value="react">React</option>
        <option value="node">Node</option>
      </select>
    </div>
  );
};

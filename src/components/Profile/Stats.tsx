"use client";

import { useEffect, useState } from "react";
import Stat from "./Stat";
import Ratio from "./Ratio";
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

    console.log("Fetching stats from:", url);
    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, [profile, category]);

  return (
    <>
      <div>
        <div className="flex flex-col justify-center w-full items-center gap-y-2">
          <p className="lg:text-2xl md:text-xl text-base font-ibmPlexMono">
            SELECT CATEGORY
          </p>
          <CategoryDropdown setCategory={setCategory} />
        </div>
        <div className="flex md:flex-row flex-col md:justify-around justify-evenly items-center gap-y-[10vh]">
          <Stat label="Wins" data={stats.wins} />
          <Ratio data={stats} />
          <Stat label="Losses" data={stats.losses} />
        </div>
      </div>
    </>
  );
}

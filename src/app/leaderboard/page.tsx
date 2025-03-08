"use client";

import Board from "@/components/Leaderboard/Board";
import ToggleAccount from "@/components/Leaderboard/ToggleAccount";
import { Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface AggregatedUserGames {
  userId: string;
  _sum: {
    wins: number | null;
    losses: number | null;
  };
}

export default function LeaderboardPage() {
  const [data, setData] = useState<AggregatedUserGames[]>([]);
  const [category, setCategory] = useState<string>("All");

  const { data: session } = useSession();

  const getData = async () => {
    console.log("loading data...");
    const response = await fetch(`/api/users/${category}`);

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const data = await response.json();
    console.log(data.data);
    setData(data.data);
    console.log("Data ready!");
  };

  useEffect(() => {
    if (session) {
      getData();
    }
  }, [session, category]);

  return (
    <div className="flex md:flex-row flex-col my-auto h-fit max-w-[90rem] mx-auto w-full md:gap-y-0 gap-y-12">
      <ToggleAccount
        getData={getData}
        setCategory={setCategory}
        category={category}
      />
      <Board data={data} />
    </div>
  );
}

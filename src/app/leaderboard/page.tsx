"use client";

import Board from "@/components/Leaderboard/Board";
import ToggleAccount from "@/components/Leaderboard/ToggleAccount";
import prisma from "@/lib/db";
import { useEffect, useState } from "react";

export default async function LeaderboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await prisma.profile.findMany({
      orderBy: {
        wins: "desc",
      },
      take: 100,
    });

    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
        getData();
    }
  }, [loading]);

  return (
    <div className="flex flex-row my-auto h-fit">
      <Board data={data} loading={loading} />
      <ToggleAccount loading={loading} getData={getData}   />
    </div>
  );
}

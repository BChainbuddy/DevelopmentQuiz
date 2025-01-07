"use client";

import Board from "@/components/Leaderboard/Board";
import ToggleAccount from "@/components/Leaderboard/ToggleAccount";
import { Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState<Profile[]>([]);

  const { data: session } = useSession();

  const getData = async () => {
    console.log("loading data...");
    const response = await fetch("/api/users");

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
  }, [session]);

  return (
    <div className="flex flex-row my-auto h-fit">
      <Board data={data} />
      <ToggleAccount getData={getData} />
    </div>
  );
}

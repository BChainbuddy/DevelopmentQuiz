"use client";

import Board from "@/components/Leaderboard/Board";
import ToggleAccount from "@/components/Leaderboard/ToggleAccount";
import CategoryDropdown from "@/components/Profile/CategoryDropdown";
import { Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState<Profile[]>([]);
  const [category, setCategory] = useState<string>("all");

  const { data: session } = useSession();

  const getData = async () => {
    console.log("loading data...");
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const data = await response.json();
    setData(data.data);
    console.log("Data ready!");
  };

  useEffect(() => {
    if (session) {
      getData();
    }
  }, [session]);

  return (
    <div className="flex md:flex-row flex-col my-auto h-fit max-w-[90rem] mx-auto w-full md:gap-y-0 gap-y-12">
      <ToggleAccount getData={getData} setCategory={setCategory} />
      <Board data={data} />
    </div>
  );
}

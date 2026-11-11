"use client";

import Board from "@/components/Leaderboard/Board";
import ToggleAccount from "@/components/Leaderboard/ToggleAccount";
import { useLeaderboard } from "@/hooks/queries";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function LeaderboardPage() {
  const [category, setCategory] = useState<string>("All");

  const { data: session } = useSession();
  const { data, isPending } = useLeaderboard(category, Boolean(session));

  return (
    <div className="flex md:flex-row flex-col md:my-auto mt-12 h-fit max-w-[90rem] mx-auto w-full md:gap-y-0 gap-y-12">
      <ToggleAccount setCategory={setCategory} category={category} />
      <Board data={data ?? []} loading={isPending && Boolean(session)} />
    </div>
  );
}

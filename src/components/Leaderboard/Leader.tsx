"use client";

import { useSession } from "next-auth/react";
import { AggregatedUserGames } from "@/app/leaderboard/page";

interface LeaderProps {
  player: AggregatedUserGames;
  rank: number;
}

export default function Leader({ player, rank }: LeaderProps) {
  const { data: session } = useSession();

  const isCurrentUser = player.userId === session?.user?.email;

  const formatNumber = (ratio: number) => {
    if (ratio < 0) {
      return ratio.toFixed(2);
    } else {
      return ratio.toFixed(1);
    }
  };

  return (
    <div
      className={`w-full h-[44px] flex flex-row items-center md:px-5 px-3 py-2 border-b border-white/10 lg:text-sm md:text-xs text-[10px] transition-colors ${
        isCurrentUser
          ? "bg-emerald-500/20 border-emerald-500/30"
          : "hover:bg-white/5"
      }`}
    >
      <p className={`md:w-[15%] w-[20%] font-medium ${rank <= 3 ? "opacity-100" : "opacity-70"}`}>
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
      </p>
      <p className={`md:w-[52.5%] w-[40%] lg:text-sm md:text-xs text-[8px] truncate ${isCurrentUser ? "font-semibold" : ""}`}>
        {player.userId}
      </p>
      <p className="md:w-[15%] w-[20%] font-medium">{player._sum.wins}</p>
      <p className="md:w-[17.5%] w-[20%] opacity-70">
        {player._sum.wins && player._sum.losses
          ? formatNumber(player._sum.wins / player._sum.losses)
          : player._sum.wins
          ? player._sum.wins
          : 0}
      </p>
    </div>
  );
}

import { useSession } from "next-auth/react";
import { AggregatedUserGames } from "@/app/leaderboard/page";

interface LeaderProps {
  player: AggregatedUserGames;
  rank: number;
}

export default function Leader({ player, rank }: LeaderProps) {
  const { data: session } = useSession();

  const formatNumber = (ratio: number) => {
    if (ratio < 0) {
      return ratio.toFixed(2);
    } else {
      return ratio.toFixed(1);
    }
  };

  return (
    <div
      className={`w-full h-[40px] text-black flex flex-row items-center md:px-5 px-2 py-2 border-y mt-2 lg:text-base md:text-sm text-[10px] -pr-[26px] ${
        player.userId == session?.user?.email && "bg-[#84C981]"
      }`}
    >
      <p className="md:w-[15%] w-[20%]">{rank}</p>
      <p className="md:w-[52.5%] w-[40%] lg:text-base md:text-xs text-[6px] overflow-x-hidden">
        {player.userId}
      </p>
      <p className="md:w-[15%] w-[20%]">{player._sum.wins}</p>
      <p className="md:w-[17.5%] w-[20%]">
        {player._sum.wins && player._sum.losses
          ? formatNumber(player._sum.wins / player._sum.losses)
          : player._sum.wins
          ? player._sum.wins
          : 0}
      </p>
    </div>
  );
}

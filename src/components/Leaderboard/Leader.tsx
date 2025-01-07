import { Profile } from "@prisma/client";
import { useSession } from "next-auth/react";

interface LeaderProps {
  player: Profile;
  rank: number;
}

export default function Leader({ player, rank }: LeaderProps) {
  const { data: session } = useSession();

  return (
    <div
      className={`w-full h-[40px] text-black flex flex-row items-center px-5 py-2 border-y mt-2 ${
        player.username == session?.user?.email && "bg-[#84C981]"
      }`}
    >
      <p className="w-[15%]">{rank}</p>
      <p className="w-[40%]">{player.username}</p>
      <p className="w-[17.5%]">{player.wins}</p>
      <p className="w-[17.5%]">
        {player.wins && player.losses ? player.wins / player.losses : 0}
      </p>
    </div>
  );
}

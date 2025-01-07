import { Profile } from "@prisma/client";
import { getServerSession } from "next-auth";

interface LeaderProps {
  player: Profile;
  rank: number;
}

export default async function Leader({ player, rank }: LeaderProps) {
  const session = await getServerSession();

  return (
    <div
      className={`w-full text-black flex flex-row items-center px-5 py-2 border-y mt-2 ${
        player.username == session?.user?.email && "bg-[#84C981]"
      }`}
    >
      <p className="w-[15%]">{rank}</p>
      <p className="w-[40%]">{player.username}</p>
      <p className="w-[17.5%]">{player.wins}</p>
      <p className="w-[17.5%]">{player.wins / player.losses}</p>
    </div>
  );
}

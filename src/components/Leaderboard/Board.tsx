import { AggregatedUserGames } from "@/app/leaderboard/page";
import Leader from "./Leader";

interface BoardProps {
  data: AggregatedUserGames[];
}

export default function Board({ data }: BoardProps) {
  return (
    <div className="max-w-[50rem] md:flex-[2] lg:h-[30rem] md:h-[25rem] h-[35vh] bg-[var(--background)]/80 backdrop-blur-md border border-white/20 font-ibmPlexMono rounded-xl flex flex-col order-2 md:order-1 overflow-hidden">
      <div className="w-full flex flex-row items-center md:pl-5 bg-white/10 py-3 md:pr-[36px] px-3 lg:text-sm md:text-xs text-xs font-medium opacity-70">
        <p className="md:w-[15%] w-[20%]">Rank</p>
        <p className="md:w-[52.5%] w-[40%]">Name</p>
        <p className="md:w-[15%] w-[20%]">Wins</p>
        <p className="w-[17.5%] md:block hidden">W/L Ratio</p>
        <p className="w-[20%] block md:hidden">W/L</p>
      </div>
      <div className="grid grid-cols-1 flex-1 place-content-start overflow-y-auto no-scrollbar">
        {data.length > 0 ? (
          <>
            {data.map((item, i) => (
              <Leader player={item} rank={i + 1} key={i} />
            ))}
          </>
        ) : (
          <div className="text-center py-8 opacity-50">No players yet!</div>
        )}
      </div>
    </div>
  );
}

import { Profile } from "@prisma/client";
import Leader from "./Leader";

interface BoardProps {
  data: Profile[];
}

export default function Board({ data }: BoardProps) {
  return (
    <div className="max-w-[50rem] md:flex-[2] lg:h-[30rem] md:h-[25rem] h-[30vh] bg-white font-ibmPlexMono rounded-md flex flex-col order-2 md:order-1">
      <div className="w-full text-white flex flex-row items-center md:pl-5 bg-[#818181] py-2 md:pr-[36px] px-2 lg:text-base md:text-sm text-xs">
        <p className="md:w-[15%] w-[20%]">Rank</p>
        <p className="md:w-[52.5%] w-[40%]">Name</p>
        <p className="md:w-[15%] w-[20%]">Wins</p>
        <p className="w-[17.5%] md:block hidden">W/L Ratio</p>
        <p className="w-[20%] block md:hidden">W/L</p>
      </div>
      <div className="grid grid-cols-1 flex-1 place-content-start overflow-y-auto no-scrollbar md:overflow-y-scroll">
        {data.length > 0 ? (
          <>
            {data.map((item, i) => (
              <Leader player={item} rank={i + 1} key={i} />
            ))}
          </>
        ) : (
          <div className="text-black text-center">No players yet!</div>
        )}
      </div>
    </div>
  );
}

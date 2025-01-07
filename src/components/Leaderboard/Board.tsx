import { Profile } from "@prisma/client";
import Leader from "./Leader";

interface BoardProps {
  data: Profile[];
}

export default function Board({ data }: BoardProps) {
  return (
    <div className="w-[50rem] h-[30rem] bg-white font-ibmPlexMono rounded-md overflow-hidden flex flex-col">
      <div className="w-full text-white flex flex-row items-center px-5 bg-[#818181] py-2 pr-[35px]">
        <p className="w-[15%]">Rank</p>
        <p className="w-[40%]">Name</p>
        <p className="w-[17.5%]">Wins</p>
        <p className="w-[17.5%]">W/L ratio</p>
      </div>
      <div className="grid grid-cols-1 overflow-y-scroll flex-1 place-content-start">
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

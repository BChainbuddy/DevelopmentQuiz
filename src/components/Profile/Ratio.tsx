import { Profile } from "@prisma/client";

interface RatioProps {
  data: Profile | null;
}

export default function Ratio({ data }: RatioProps) {
  return (
    <div className="flex flex-col mt-[30vh]">
      <p className="text-2xl font-bold py-2">WIN/LOSS RATIO</p>
      <p className="text-7xl text-center font-bold">
        {data?.wins && data?.losses ? data.wins / data.losses : 0}
      </p>
    </div>
  );
}

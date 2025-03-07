import { StatsData } from "./Stats";

export default function Ratio({ data }: { data: StatsData }) {
  return (
    <div className="flex flex-col lg:mt-[30vh] md:mt-[25vh]">
      <p className="lg:text-2xl md:text-xl text-lg font-bold md:py-2 py-1 text-center">
        WIN/LOSS RATIO
      </p>
      <p className="lg:text-7xl md:text-6xl text-4xl text-center font-bold">
        {data.wins && data.losses
          ? (data.wins / data.losses).toFixed(2)
          : data?.wins
          ? data.wins
          : 0}
      </p>
    </div>
  );
}

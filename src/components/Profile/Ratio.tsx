import { StatsData } from "./Stats";

export default function Ratio({ data }: { data: StatsData }) {
  const ratio = data.wins && data.losses
    ? (data.wins / data.losses).toFixed(2)
    : data?.wins
    ? data.wins.toString()
    : "0";

  return (
    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-8 py-6 backdrop-blur-sm lg:mt-[20vh] md:mt-[15vh] mt-0">
      <p className="lg:text-xs md:text-xs text-[10px] font-medium opacity-60 uppercase tracking-wider mb-2">
        Win/Loss Ratio
      </p>
      <p className="lg:text-6xl md:text-5xl text-4xl font-bold">
        {ratio}
      </p>
    </div>
  );
}

interface StatProps {
  label: string;
  data: number | undefined | string;
  color?: "emerald" | "red";
}

export default function Stat({ label, data, color }: StatProps) {
  const colorClass = color === "emerald"
    ? "text-emerald-400"
    : color === "red"
    ? "text-red-400"
    : "";

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
      <p className="text-xs font-medium opacity-50 uppercase tracking-wider">
        {label}
      </p>
      <p className={`lg:text-3xl md:text-2xl text-xl font-bold ${colorClass}`}>
        {data}
      </p>
    </div>
  );
}

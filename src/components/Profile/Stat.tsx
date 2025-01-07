interface StatProps {
  label: string;
  data: number | undefined;
}

export default function Stat({ label, data }: StatProps) {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center w-[10rem]">
      <p className="border-b-4 w-full text-center text-4xl py-2">{label}</p>
      <p className="text-7xl font-bold">{data}</p>
    </div>
  );
}

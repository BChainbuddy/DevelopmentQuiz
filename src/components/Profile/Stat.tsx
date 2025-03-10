interface StatProps {
  label: string;
  data: number | undefined | string;
}

export default function Stat({ label, data }: StatProps) {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center lg:w-[10rem] md:w-[8rem] w-[5rem]">
      <p className="md:border-b-4 border-b-2 w-full text-center lg:text-4xl md:text-3xl md:py-2 py-1">
        {label}
      </p>
      <p className="lg:text-7xl md:text-6xl text-3xl font-bold">{data}</p>
    </div>
  );
}

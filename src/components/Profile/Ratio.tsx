interface RatioProps {
  data: { username: string; wins: number; losses: number };
}

export default function Ratio({ data }: RatioProps) {
  return (
    <div className="flex flex-col mt-[30vh]">
      <p className="text-2xl font-bold py-2">WIN/LOSS RATIO</p>
      <p className="text-7xl text-center font-bold">
        {data.wins / data.losses}
      </p>
    </div>
  );
}

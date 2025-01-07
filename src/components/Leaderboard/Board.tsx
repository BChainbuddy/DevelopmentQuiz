import { Profile } from "@prisma/client";
import Leader from "./Leader";

interface BoardProps {
  loading: boolean;
  data: Profile[];
}

export default function Board({ loading }: BoardProps) {
  //Mock data
  const data = [
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "bchainbuddy@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
    {
      username: "jaka.potokar5@gmail.com",
      wins: 123,
      losses: 100,
      public: true,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[50rem] h-[30rem] bg-white font-ibmPlexMono rounded-md overflow-hidden flex flex-col">
      <div className="w-full text-white flex flex-row items-center px-5 bg-[#818181] py-2 pr-[35px]">
        <p className="w-[15%]">Rank</p>
        <p className="w-[40%]">Name</p>
        <p className="w-[17.5%]">Wins</p>
        <p className="w-[17.5%]">W/L ratio</p>
      </div>
      <div className="grid grid-cols-1 overflow-y-scroll flex-1">
        {data.map((item, i) => (
          <Leader player={item} rank={i + 1} key={i} />
        ))}
      </div>
    </div>
  );
}

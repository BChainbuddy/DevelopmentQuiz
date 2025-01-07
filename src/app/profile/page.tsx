import Ratio from "@/components/Profile/Ratio";
import Stat from "@/components/Profile/Stat";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession();

  const profile = await prisma.profile.findUnique({
    where: {
      username: session?.user?.email ?? "",
    },
  });

  // Mock data
  const data = {
    username: "jakapotokar50@gmail.com",
    wins: 110,
    losses: 100,
    public: false,
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto justify-evenly px-[5%] pb-[10vh] font-inter">
      <div>
        <p className="text-2xl">
          Welcome {session?.user?.name}
          <span className="text-4xl ml-2">👋</span>
        </p>
      </div>
      <div className="flex flex-row justify-around">
        <Stat label="Wins" data={110} />
        <Ratio data={data} />
        <Stat label="Losses" data={100} />
      </div>
    </div>
  );
}

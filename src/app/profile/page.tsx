import LogoutButton from "@/components/Profile/Logout";
import Stats from "@/components/Profile/Stats";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession();

  const profile = await prisma.profile.findUnique({
    where: {
      username: session?.user?.email ?? "",
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto justify-evenly px-[5%] pb-[10vh] font-inter">
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl">
          Welcome {session?.user?.name}
          <span className="text-4xl ml-2">👋</span>
        </p>
        <LogoutButton />
      </div>
      <Stats profile={profile} />
    </div>
  );
}

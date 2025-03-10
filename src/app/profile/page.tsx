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
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto md:justify-evenly lg:px-[2%] pb-[10vh] font-inter">
      <div className="flex flex-col gap-y-4 self-center md:self-start justify-center items-center md:items-start mt-10 md:mt-0">
        <p className="lg:text-2xl md:text-xl text-lg">
          Welcome {session?.user?.name}
          <span className="lg:text-4xl md:text-3xl text-2xl md:ml-2 ml-1">
            👋
          </span>
        </p>
        <LogoutButton />
      </div>
      <Stats profile={profile} />
    </div>
  );
}

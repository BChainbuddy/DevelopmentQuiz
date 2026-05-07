import ProfileDashboard from "@/components/Profile/ProfileDashboard";
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
    <div className="flex-1 w-full max-w-[90rem] mx-auto lg:px-[2%] py-6 md:py-10 font-inter">
      <ProfileDashboard
        profile={profile}
        userName={session?.user?.name ?? "User"}
        userEmail={session?.user?.email ?? ""}
      />
    </div>
  );
}

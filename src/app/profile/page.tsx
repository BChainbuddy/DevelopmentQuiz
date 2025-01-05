import prisma from "@/lib/db";

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({
    where: {
      username: "jaka.potokar50@gmail.com",
    },
  }); // get username from next/auth

  return <></>;
}

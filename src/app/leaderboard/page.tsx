import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function LeaderboardPage() {
  const session = await getServerSession();

  const players = await prisma.profile.findMany({
    orderBy: {
      wins: "desc",
    },
    take: 100,
  });

  return <></>;
}

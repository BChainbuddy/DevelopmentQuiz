import prisma from "@/lib/db";

export default async function LeaderboardPage() {
  const players = await prisma.profile.findMany({
    orderBy: {
      wins: "desc",
    },
    take: 100,
  });

  return <></>;
}

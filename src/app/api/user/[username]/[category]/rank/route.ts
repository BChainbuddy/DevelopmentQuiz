import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { username: string; category: string } }
) {
  try {
    const { username, category } = params;

    const session = await getServerSession();
    if (session?.user?.email !== username) {
      return NextResponse.json(
        { error: "User not authorized to see this data" },
        { status: 403 }
      );
    }

    let aggregatedStats;

    if (category && category.toLowerCase() !== "all") {
      aggregatedStats = await prisma.userGames.groupBy({
        by: ["userId"],
        where: { categoryName: category },
        _sum: { wins: true },
        orderBy: { _sum: { wins: "desc" } },
      });
    } else {
      aggregatedStats = await prisma.userGames.groupBy({
        by: ["userId"],
        _sum: { wins: true },
        orderBy: { _sum: { wins: "desc" } },
      });
    }

    const rank =
      aggregatedStats.findIndex((entry) => entry.userId === username) + 1;

    return NextResponse.json({ rank });
  } catch (error) {
    console.error("Error fetching player rank:", error);
    return NextResponse.json(
      { error: "Failed to fetch player rank" },
      { status: 500 }
    );
  }
}

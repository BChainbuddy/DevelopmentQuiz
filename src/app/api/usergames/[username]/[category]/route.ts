import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(
  request: Request,
  { params }: { params: { username: string; category: string } }
) {
  try {
    const session = await getServerSession();

    if (session?.user?.email !== params.username) {
      return NextResponse.json(
        { error: "User not authorized to see this data" },
        { status: 403 }
      );
    }
    const { username, category } = params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    if (category && category !== "all") {
      const record = await prisma.userGames.findUnique({
        where: {
          userId_categoryName: { userId: username, categoryName: category },
        },
      });
      return NextResponse.json({
        wins: record?.wins ?? 0,
        losses: record?.losses ?? 0,
      });
    } else {
      const aggregated = await prisma.userGames.aggregate({
        _sum: {
          wins: true,
          losses: true,
        },
        where: { userId: username },
      });
      return NextResponse.json({
        wins: aggregated._sum.wins ?? 0,
        losses: aggregated._sum.losses ?? 0,
      });
    }
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}

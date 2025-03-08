import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    let data;

    if (category && category.toLowerCase() !== "all") {
      data = await prisma.userGames.groupBy({
        by: ["userId"],
        where: {
          categoryName: category,
          profile: { public: true },
        },
        _sum: { wins: true, losses: true },
        orderBy: { _sum: { wins: "desc" } },
        take: 100,
      });
    } else {
      data = await prisma.userGames.groupBy({
        by: ["userId"],
        where: { profile: { public: true } },
        _sum: { wins: true, losses: true },
        orderBy: {
          _sum: {
            wins: "desc",
          },
        },
        take: 100,
      });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Failed to fetch players" });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getServerSession();

    if (session?.user?.email !== params.username) {
      return NextResponse.json(
        { error: "User not authorized to see this data" },
        { status: 403 }
      );
    }

    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Get all category stats for this user
    const categoryStats = await prisma.userGames.findMany({
      where: { userId: username },
      orderBy: { wins: "desc" },
    });

    // Calculate totals
    const totals = categoryStats.reduce(
      (acc, cat) => ({
        wins: acc.wins + cat.wins,
        losses: acc.losses + cat.losses,
      }),
      { wins: 0, losses: 0 }
    );

    // Find best category (highest win rate with minimum 3 games)
    const categoriesWithStats = categoryStats
      .map((cat) => {
        const total = cat.wins + cat.losses;
        const winRate = total > 0 ? (cat.wins / total) * 100 : 0;
        return {
          ...cat,
          total,
          winRate,
        };
      })
      .filter((cat) => cat.total >= 3);

    const bestCategory =
      categoriesWithStats.length > 0
        ? categoriesWithStats.reduce((best, cat) =>
            cat.winRate > best.winRate ? cat : best
          )
        : null;

    return NextResponse.json({
      categories: categoryStats,
      totals,
      bestCategory: bestCategory
        ? {
            name: bestCategory.categoryName,
            winRate: bestCategory.winRate.toFixed(1),
            wins: bestCategory.wins,
            losses: bestCategory.losses,
          }
        : null,
    });
  } catch (error) {
    console.error("Error fetching user category stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}

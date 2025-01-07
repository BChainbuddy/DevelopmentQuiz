import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
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

    const data = await prisma.profile.findMany({
      where: {
        public: true,
      },
      orderBy: {
        wins: "desc",
      },
    });

    let rank = data.findIndex((user) => user.username === username);
    rank++;

    return NextResponse.json({ rank });
  } catch (error) {
    console.error("Error fetching player rank:", error);
    return NextResponse.json(
      { error: "Failed to fetch player rank" },
      { status: 500 }
    );
  }
}

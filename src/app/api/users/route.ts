import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const data = await prisma.profile.findMany({
      where: {
        public: true,
      },
      orderBy: {
        wins: "desc",
      },
      take: 100,
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Failed to fetch players" });
  }
}

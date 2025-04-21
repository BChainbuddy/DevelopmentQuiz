import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/openai";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt") ?? "";
  const count = Number(searchParams.get("count") ?? "");

  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }
  if (Number.isNaN(count) || count < 1 || count > 10) {
    return NextResponse.json(
      { error: "count must be a number between 1 and 10" },
      { status: 400 }
    );
  }

  try {
    const questions = await fetchQuestions(prompt, count);
    return NextResponse.json({ data: questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

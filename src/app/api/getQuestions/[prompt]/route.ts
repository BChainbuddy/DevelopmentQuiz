import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/openai";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { prompt: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "User not authorized to see this data" },
        { status: 403 }
      );
    }

    const { prompt } = params;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { data } = await fetchQuestions(prompt);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return NextResponse.json({ error: "Failed to fetch openai questions" });
  }
}

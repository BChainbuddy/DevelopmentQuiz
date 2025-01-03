import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/openai";

export async function GET(req: Request) {
  try {
    const { data } = await fetchQuestions();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return NextResponse.json({ error: "Failed to fetch openai questions" });
  }
}

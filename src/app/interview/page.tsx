"use client";

import Quiz from "@/components/Quiz/Quiz";
import CircleLoading from "@/ui/CircleLoading";
import { useState } from "react";

export default function InterviewPage() {
  const TOTAL_ROUNDS = 10;

  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const [round, setRound] = useState(0);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<{ choice: string; answer: string }[]>(
    []
  );
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [position, setPosition] = useState<string>("Frontend");

  function buildPrompt(position: string, round: number) {
    return (
      `You are an experienced ${position} engineering manager conducting a mock interview. ` +
      `Provide exactly one multiple-choice question (Question ${round} of ${TOTAL_ROUNDS}) relevant to a ${position} developer role. ` +
      `Format precisely as:
        Question: <the question text>
        A) <choice A>
        B) <choice B>
        C) <choice C>
        Correct answer: <letter>`
    );
  }

  // Fetch one round
  async function fetchRound(retryCount = 0) {
    setLoadingGame(true);
    try {
      const prompt = buildPrompt(position, round);
      const res = await fetch(
        `/api/getQuestions/${encodeURIComponent(prompt)}`
      );
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const { data } = await res.json();
      const raw = data.choices[0].message.content;

      const lines: string[] = raw
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l);

      // Parse question
      const qLine = lines.find((l) => /^Question:/i.test(l));
      const qText = qLine ? qLine.replace(/^Question:/i, "").trim() : "";

      // Parse options
      const opts: { choice: string; answer: string }[] = [];
      for (const l of lines) {
        const m = l.match(/^([A-C])\)\s*(.+)$/);
        if (m) opts.push({ choice: m[1], answer: m[2] });
      }

      // Parse correct
      const corrLine = lines.find((l) => /^Correct answer:/i.test(l));
      const corrMatch = corrLine
        ? corrLine
            .replace(/^Correct answer:/i, "")
            .trim()
            .match(/^([A-C])/i)
        : null;
      const corr = corrMatch ? corrMatch[1].toUpperCase() : "";

      if (!qText || opts.length !== 3 || !corr) {
        if (retryCount < 3) return fetchRound(retryCount + 1);
        console.error("Invalid structure after retries");
        return;
      }

      setQuestion(qText);
      setAnswers(opts);
      setCorrectAnswer(corr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGame(false);
    }
  }

  async function newRound() {
    if (round >= TOTAL_ROUNDS) {
      setStartGame(false);
      return;
    }
    const next = round + 1;
    setRound(next);
    await fetchRound();
  }

  function handleNewGame() {
    setRound(1);
    setStartGame(true);
    fetchRound();
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto">
      {!startGame ? (
        <div className="flex flex-col flex-1 md:justify-center items-center font-ibmPlexMono gap-y-5 mt-8 md:mt-0">
          <h1 className="text-2xl text-white">Mock Interview</h1>
          <p className="max-w-xl text-[#FFFFFF99] text-center">
            Practice {TOTAL_ROUNDS} multiple-choice questions for your desired
            role. Stats won’t be recorded.
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="e.g. Senior Backend Node.js Developer"
              className="w-80 p-2 rounded-lg bg-[#FFFFFF33] text-white placeholder-[#FFFFFF99] focus:ring-white focus:ring-2 focus:outline-none"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <button
            className="mt-6 bg-white text-black py-2 px-4 rounded-lg hover:bg-[#FFFFFF99] transition duration-300 ease-out"
            onClick={handleNewGame}
          >
            START INTERVIEW
          </button>
        </div>
      ) : loadingGame ? (
        <div className="flex flex-1 items-center justify-center">
          <CircleLoading className="w-8 h-8 fill-[#d9d9d9]" />
        </div>
      ) : (
        <Quiz
          setStartGame={setStartGame}
          newRound={newRound}
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
          category={position}
          maxRounds={TOTAL_ROUNDS}
          round={round}
        />
      )}
    </div>
  );
}

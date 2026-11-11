"use client";

import Quiz from "@/components/Quiz/Quiz";
import Results from "@/components/Quiz/Results";
import CircleLoading from "@/ui/CircleLoading";
import { useState } from "react";
import { interviewPrompt } from "@/lib/prompts";
import { isValidQuestion } from "@/lib/questionShape";
import StartButton from "@/ui/StartButton";
import Title from "@/ui/Title";

export default function InterviewPage() {
  const TOTAL_ROUNDS = 10;

  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const [questionsList, setQuestionsList] = useState<
    {
      question: string;
      answers: { choice: string; answer: string }[];
      correctAnswer: string;
    }[]
  >([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);

  const [position, setPosition] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Must contain at least one role word
  const roleKeywords = [
    "developer", "engineer", "programmer", "coder", "dev",
    "architect", "scientist", "analyst", "specialist",
    "devops", "sre", "qa", "tester",
  ];

  function isDevRole(input: string): boolean {
    const lower = input.toLowerCase();
    return roleKeywords.some((keyword) => lower.includes(keyword));
  }

  // The server repairs invalid payloads itself (see lib/openai.ts), so this is
  // a thin outer guard rather than the primary retry path.
  const MAX_RETRIES = 1;

  async function fetchAllQuestions(retryCount = 0) {
    setLoadingGame(true);
    setError("");
    try {
      const prompt = interviewPrompt(position);
      const url = new URL("/api/getQuestions", window.location.origin);
      url.searchParams.set("prompt", prompt);
      url.searchParams.set("count", String(TOTAL_ROUNDS));

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const payload = (await res.json()) as { data: unknown };
      const rawQuestions = Array.isArray(payload.data) ? payload.data : [];

      // A short or malformed set used to slip through and render a truncated
      // interview; now it is a retry, then a visible error.
      if (
        rawQuestions.length !== TOTAL_ROUNDS ||
        !rawQuestions.every(isValidQuestion)
      ) {
        if (retryCount < MAX_RETRIES) {
          return fetchAllQuestions(retryCount + 1);
        }
        throw new Error(
          `Expected ${TOTAL_ROUNDS} valid questions, got ${rawQuestions.length}`
        );
      }

      setQuestionsList(
        rawQuestions.map((q) => ({
          question: q.question,
          answers: q.answers.map((answer, i) => ({
            choice: String.fromCharCode(65 + i), // 'A','B','C'
            answer,
          })),
          correctAnswer: q.correctAnswer,
        }))
      );
      setCurrentIndex(0);
      setNumCorrect(0);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);

      if (!message.startsWith("HTTP") && retryCount < MAX_RETRIES) {
        return fetchAllQuestions(retryCount + 1);
      }

      setError("Couldn't build the interview. Please try again.");
    } finally {
      setLoadingGame(false);
    }
  }

  function goToNextRound() {
    setCurrentIndex((i) => i + 1);
  }

  function handleStart() {
    const trimmed = position.trim();

    if (!trimmed || trimmed.length < 3) {
      setError("Please enter a developer role");
      return;
    }

    if (!isDevRole(trimmed)) {
      setError("This doesn't look like a developer role");
      return;
    }

    setError("");
    setStartGame(true);
    fetchAllQuestions();
  }

  function handleAnswerSelected(selectedAnswer: string) {
    if (selectedAnswer === current.correctAnswer) {
      setNumCorrect((prev) => prev + 1);
    }
  }

  const current = questionsList[currentIndex] || {
    question: "",
    answers: [],
    correctAnswer: "",
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
      {!startGame ? (
        <div className="flex flex-col flex-1 md:justify-center items-center font-ibmPlexMono gap-y-6 mt-8 md:mt-0">
          <Title title="Interview" />
          <p className="max-w-[40rem] text-[var(--muted)] md:text-center text-start md:text-base text-xs">
            Practice {TOTAL_ROUNDS} multiple-choice questions for your desired
            role. Stats won't be recorded.
          </p>
          <div className="flex flex-col items-center gap-y-2 mt-2">
            <label
              htmlFor="target-role"
              className="text-xs md:text-sm font-medium text-[var(--muted)] uppercase tracking-wider cursor-pointer select-none"
            >
              Target Role
            </label>
            <input
              id="target-role"
              type="text"
              placeholder="e.g. Senior Backend Node.js Developer"
              className={`md:w-96 w-[85vw] max-w-96 px-4 py-3 md:text-sm text-xs rounded-xl bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-[var(--muted)] focus:bg-[var(--card-bg-hover)] focus:outline-none focus:ring-2 transition-colors duration-200 ${
                error
                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/40"
                  : "border-[var(--card-border)] focus:border-emerald-500/70 focus:ring-emerald-500/30"
              }`}
              onChange={(e) => {
                setPosition(e.target.value);
                if (error) setError("");
              }}
            />
            {error && (
              <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
          </div>
          <StartButton startGame={handleStart} title="START INTERVIEW" />
        </div>
      ) : loadingGame ? (
        <div className="flex flex-1 items-center justify-center">
          <CircleLoading />
        </div>
      ) : error ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4 font-ibmPlexMono">
          <p className="md:text-sm text-xs text-red-400 text-center">{error}</p>
          <div className="flex flex-row gap-3">
            <button
              className="bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] md:py-2 md:px-4 py-1.5 px-3 rounded-lg md:text-sm text-xs font-medium transition-all duration-200"
              onClick={() => fetchAllQuestions()}
            >
              TRY AGAIN
            </button>
            <button
              className="bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] md:py-2 md:px-4 py-1.5 px-3 rounded-lg md:text-sm text-xs font-medium transition-all duration-200"
              onClick={() => {
                setError("");
                setStartGame(false);
              }}
            >
              BACK
            </button>
          </div>
        </div>
      ) : currentIndex >= TOTAL_ROUNDS ? (
        <Results percent={numCorrect / TOTAL_ROUNDS} />
      ) : (
        <Quiz
          key={currentIndex}
          setStartGame={setStartGame}
          newRound={goToNextRound}
          question={current.question}
          answers={current.answers}
          correctAnswer={current.correctAnswer}
          maxRounds={TOTAL_ROUNDS}
          round={currentIndex + 1}
          onAnswerSelected={handleAnswerSelected}
        />
      )}
    </div>
  );
}

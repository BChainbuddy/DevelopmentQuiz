"use client";

import Quiz from "@/components/Quiz/Quiz";
import Results from "@/components/Quiz/Results";
import CircleLoading from "@/ui/CircleLoading";
import { useState } from "react";
import { interviewPrompt } from "@/lib/prompts";
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

  async function fetchAllQuestions() {
    setLoadingGame(true);
    try {
      const prompt = interviewPrompt(position);
      const url = new URL("/api/getQuestions", window.location.origin);
      url.searchParams.set("prompt", prompt);
      url.searchParams.set("count", String(TOTAL_ROUNDS));

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { data: rawQuestions } = (await res.json()) as {
        data: Array<{
          question: string;
          answers: string[];
          correctAnswer: string;
        }>;
      };
      const items = rawQuestions.map((q) => ({
        question: q.question,
        answers: q.answers.map((ans, i) => ({
          choice: String.fromCharCode(65 + i), // 'A','B','C'
          answer: ans,
        })),
        correctAnswer: q.correctAnswer,
      }));

      if (items.length !== TOTAL_ROUNDS) {
        console.error(
          `Expected ${TOTAL_ROUNDS} questions, got ${items.length}`
        );
      }
      setQuestionsList(items);
      setCurrentIndex(0);
      setNumCorrect(0);
    } catch (err) {
      console.error(err);
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
            <label className="text-xs md:text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
              Target Role
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Backend Node.js Developer"
              className={`md:w-96 w-[85vw] max-w-96 px-4 py-3 md:text-sm text-xs rounded-xl bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-[var(--muted)] focus:bg-[var(--card-bg-hover)] focus:outline-none transition-all duration-200 ${
                error
                  ? "border-red-500/50 focus:border-red-500/70"
                  : "border-[var(--card-border)] focus:border-[var(--card-border-hover)]"
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

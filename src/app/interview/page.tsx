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

  const [position, setPosition] = useState<string>("Frontend");

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
        <div className="flex flex-col flex-1 md:justify-center items-center font-ibmPlexMono gap-y-5 mt-8 md:mt-0">
          <Title title="Interview" />
          <p className="max-w-[40rem] text-[#FFFFFF99] md:text-center text-start md:text-base text-xs">
            Practice {TOTAL_ROUNDS} multiple-choice questions for your desired
            role. Stats won’t be recorded.
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="e.g. Senior Backend Node.js Developer"
              className="md:w-80 w-[90vw] max-w-80 md:p-2 p-1.5 md:text-base text-sm rounded-lg bg-[#FFFFFF33] text-white placeholder-[#FFFFFF99] focus:ring-white focus:ring-2 focus:outline-none"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <StartButton startGame={handleStart} title="START INTERVIEW" />
        </div>
      ) : loadingGame ? (
        <div className="flex flex-1 items-center justify-center">
          <CircleLoading className="w-8 h-8 fill-[#d9d9d9]" />
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

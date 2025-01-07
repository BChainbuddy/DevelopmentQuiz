"use client";

import { useState, useRef } from "react";
import Question from "./Question";
import AnswerCard from "./AnswerCard";
import { useSession } from "next-auth/react";
import { addLoss, addWin } from "@/actions/actions";

interface QuizProps {
  startGame: boolean;
  setStartGame: (start: boolean) => void;
  newRound: () => void;
  question: string;
  answers: { choice: string; answer: string }[];
  correctAnswer: string;
}

export default function Quiz({
  startGame,
  setStartGame,
  newRound,
  question,
  answers,
  correctAnswer,
}: QuizProps) {
  const [countdown, setCountdown] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const countdownIntervalRef = useRef<number | null>(null);

  const { data: session } = useSession();

  const selectAnswer = async (choice: string) => {
    setSelectedAnswer(choice);

    if (choice === correctAnswer) {
      await addWin(session?.user?.email ?? "");
    } else {
      await addLoss(session?.user?.email ?? "");
    }

    // Countdown to next round
    let timeLeft = 10;
    countdownIntervalRef.current = window.setInterval(() => {
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        newRound();
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      }
      timeLeft--;
    }, 1000);
  };

  const handleLeaveGame = () => {
    // Clear the interval if it's active
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setCountdown(0);
    setSelectedAnswer("");

    setStartGame(false);
  };

  return (
    <div className="w-full flex-1 h-full flex flex-col font-ibmPlexMono items-center justify-evenly">
      <Question question={question} />
      <div className="flex flex-row justify-between w-full items-center gap-[15%]">
        {answers && (
          <>
            {answers.map((item, i) => (
              <AnswerCard
                choice={item.choice}
                answer={item.answer}
                correctAnswer={correctAnswer}
                selectAnswer={selectAnswer}
                selectedAnswer={selectedAnswer}
                key={i}
              />
            ))}
          </>
        )}
      </div>
      <div className="h-[6vh] mx-auto flex items-center justify-center flex-col">
        <p>{countdown ? `Starting next game in ${countdown}` : " "}</p>
        {countdown ? (
          <button
            className="slideIn bg-white opacity-90 hover:opacity-100 text-black py-1 px-3 rounded-lg mt-2 text-sm transition-all duration-300 ease-out"
            onClick={handleLeaveGame}
          >
            LEAVE GAME
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

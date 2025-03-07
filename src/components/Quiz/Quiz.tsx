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
    <div className="w-full flex-1 h-full flex flex-col font-ibmPlexMono items-center md:justify-evenly pt-3 md:pt-0">
      <Question question={question} />
      <div className="flex md:flex-row flex-col justify-between w-full items-center lg:gap-x-[15%] md:gap-x-[5%] md:gap-y-0 gap-y-[2vh] mt-6 md:mt-0">
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
      <div className="h-[6vh] mx-auto flex items-center justify-center flex-col md:mt-0 mt-6">
        <p className="md:text-base text-sm text-center">
          {countdown ? `Starting next game in ${countdown}` : " "}
        </p>
        {countdown ? (
          <button
            className="slideIn bg-white opacity-90 hover:opacity-100 text-black md:py-1 md:px-3 py-0.5 px-2 rounded-lg md:mt-2 mt-1.5 md:text-sm text-xs transition-all duration-300 ease-out"
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

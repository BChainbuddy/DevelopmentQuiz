"use client";

import { useState, useRef } from "react";
import Question from "./Question";
import AnswerCard from "./AnswerCard";

interface QuizProps {
  setStartGame: (start: boolean) => void;
  newRound: () => void;
  question: string;
  answers: { choice: string; answer: string }[];
  correctAnswer: string;
  maxRounds?: number;
  round?: number;
  onAnswerSelected: (selectedAnswer: string) => void;
}

export default function Quiz({
  setStartGame,
  newRound,
  question,
  answers,
  correctAnswer,
  maxRounds = 0,
  round = 0,
  onAnswerSelected,
}: QuizProps) {
  const [countdown, setCountdown] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const countdownIntervalRef = useRef<number | null>(null);

  const selectAnswer = async (choice: string) => {
    setSelectedAnswer(choice);
    if (countdown === 0) {
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

      onAnswerSelected(choice);
    }
  };

  const handleNextGame = () => {
    // Clear the interval if it's active
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    newRound();
  };

  const handleLeaveGame = () => {
    // Clear the interval if it's active
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setStartGame(false);
  };

  return (
    <div className="w-full flex-1 flex flex-col font-ibmPlexMono items-center justify-center pb-4">
      <div className="flex flex-col items-center">
        <Question
          question={question}
          rounds={maxRounds ? `${round}/${maxRounds}` : ""}
        />
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
          {answers &&
            answers.map((item, i) => (
              <AnswerCard
                choice={item.choice}
                answer={item.answer}
                correctAnswer={correctAnswer}
                selectAnswer={selectAnswer}
                selectedAnswer={selectedAnswer}
                key={i}
              />
            ))}
        </div>
      </div>
      <div className="min-h-[80px] mx-auto flex items-center justify-center flex-col mt-6">
        <p className="md:text-base text-sm text-center">
          {countdown ? `Starting next game in ${countdown}` : " "}
        </p>
        {countdown ? (
          <div className="flex flex-row gap-3 mt-2">
            <button
              className="slideIn bg-white/90 hover:bg-white text-black md:py-2 md:px-4 py-1.5 px-3 rounded-lg md:text-sm text-xs font-medium transition-all duration-200"
              onClick={handleNextGame}
            >
              NEXT {maxRounds ? "ROUND" : "QUESTION"}
            </button>
            <button
              className="slideIn bg-white/10 border border-white/20 hover:bg-white/20 md:py-2 md:px-4 py-1.5 px-3 rounded-lg md:text-sm text-xs font-medium transition-all duration-200"
              onClick={handleLeaveGame}
            >
              LEAVE
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

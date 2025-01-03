"use client";

import { useState } from "react";
import Question from "./Question";
import AnswerCard from "./AnswerCard";

interface QuizProps {
  setStartGame: (start: boolean) => void;
}

export default function Quiz({ setStartGame }: QuizProps) {
  const [countdown, setCountdown] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("A"); // From API
  const [answers, setAnswers] = useState([
    { choice: "A", answer: "Computer Style Sheets" },
    { choice: "B", answer: "Computer Style Sheets" },
    { choice: "C", answer: "Computer Style Sheets" },
  ]); // From API

  const selectAnswer = (choice: string) => {
    setSelectedAnswer(choice);

    // Countdown to next round
    let timeLeft = 10;
    const countdownInterval = setInterval(() => {
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        clearInterval(countdownInterval);
      }
      timeLeft--;
    }, 1000);

    // Fetch api data

    //Reset everything
  };

  return (
    <div className="w-full flex-1 h-full flex flex-col font-ibmPlexMono items-center justify-evenly">
      <Question question="What does css stand for?" />
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
            onClick={() => setStartGame(false)}
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

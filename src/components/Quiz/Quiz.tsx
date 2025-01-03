"use client";

import { useState } from "react";
import Question from "./Question";
import AnswerCard from "./AnswerCard";

export default function Quiz() {
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([
    { choice: "A", answer: "Computer Style Sheets" },
    { choice: "B", answer: "Computer Style Sheets" },
    { choice: "C", answer: "Computer Style Sheets" },
  ]);

  const selectAnswer = (choice: string) => {
    console.log("Choice", choice);
    console.log(correctAnswer);
    setSelectedAnswer(choice);
  };

  return (
    <div className="w-full flex-1 h-full flex flex-col font-ibmPlexMono items-center justify-evenly pb-[5%]">
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
    </div>
  );
}

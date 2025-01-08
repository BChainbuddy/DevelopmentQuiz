"use client";

import Quiz from "@/components/Quiz/Quiz";
import { useState } from "react";

export default function GamePage() {
  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleNewGame = () => {
    setStartGame(true);
    newRound();
  };

  async function newRound() {
    setLoadingGame(true);

    try {
      const response = await fetch("/api/getQuestions");
      const { data } = await response.json();
      const message = data.choices[0].message.content;
      const lines = message
        .split("\n")
        .map((line: any) => line.trim())
        .filter((line: any) => line !== "");
      console.log(lines);

      // Get question
      let question = "";
      for (const line of lines) {
        if (line.startsWith("Question:")) {
          question = line.replace("Question:", "").trim();
          break;
        }
      }

      // Get answer
      const answers: any = [];
      const answerPattern = /^([A-Z])\)\s*(.+)$/;

      for (const line of lines) {
        const match = line.match(answerPattern);
        if (match) {
          const choice = match[1];
          const answerText = match[2];
          answers.push({ choice: choice, answer: answerText });
        }
      }

      // Extract Correct Answer
      const correctLine = lines.find((line: any) =>
        /^Correct answer:/i.test(line)
      );
      const correctAnswer = correctLine
        ? correctLine
            .replace(/^Correct answer:/i, "")
            .trim()
            .match(/^([A-Z])/i)[1]
            .toUpperCase()
        : "";

      // console.log("question: ", question);
      // console.log("Answers: ", answers);
      // console.log("Correct answer: ", correctAnswer);
      setQuestion(question);
      setAnswers(answers);
      setCorrectAnswer(correctAnswer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGame(false);
    }
  }

  return (
    <div className="flex flex-1 w-full max-w-[90rem] mx-auto">
      {!startGame ? (
        <div className="flex flex-col flex-1 justify-center items-center font-ibmPlexMono gap-y-[10vh]">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <p className="text-2xl text-white">How the games works?</p>
            <p className="w-[40rem] text-[#FFFFFF99] text-center">
              Each game has 10 rounds, the questions have 3 multiple choice
              questions and go from easy to hard, the goal is to get a score of
              more than 60%, if successful the user gets rewarded with a win, on
              the other hand if the score is less than 60% the user gets a loss.
              When you are ready click on start game, good luck!
            </p>
          </div>
          <button
            className="text-black rounded-xl bg-white p-2 cursor-pointer"
            onClick={handleNewGame}
          >
            START GAME
          </button>
        </div>
      ) : loadingGame ? (
        <div>Loading game...</div>
      ) : (
        <Quiz
          startGame={startGame}
          setStartGame={setStartGame}
          newRound={newRound}
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
        />
      )}
    </div>
  );
}

"use client";

import Quiz from "@/components/Quiz/Quiz";
import CircleLoading from "@/ui/CircleLoading";
import { useState } from "react";
import { categories } from "@/data/categories";

export default function GamePage() {
  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<{ choice: string; answer: string }[]>(
    []
  );
  const [correctAnswer, setCorrectAnswer] = useState("");

  //   const [category, setCategory] = useState(categories[0]);
  const [position, setPosition] = useState("Frontend");

  const handleNewGame = () => {
    setStartGame(true);
    newRound();
  };

  const MAX_RETRIES = 3;

  async function newRound(retryCount = 0) {
    setLoadingGame(true);
    try {
      const response = await fetch(`/api/getQuestions/${category.prompt}`);
      if (!response.ok) {
        // If there's an HTTP error (e.g. network error, server error), throw and do not retry.
        throw new Error(`HTTP error: ${response.status}`);
      }
      const { data } = await response.json();
      const message = data.choices[0].message.content;
      const lines = message
        .split("\n")
        .map((line: string) => line.trim())
        .filter((line: string) => line !== "");

      // Parse question
      let question = "";
      for (const line of lines) {
        if (line.startsWith("Question:")) {
          question = line.replace("Question:", "").trim();
          break;
        }
      }

      // Parse answers
      const answers: { choice: string; answer: string }[] = [];
      const answerPattern = /^([A-Z])\)\s*(.+)$/;
      for (const line of lines) {
        const match = line.match(answerPattern);
        if (match) {
          const choice = match[1];
          const answerText = match[2];
          answers.push({ choice, answer: answerText });
        }
      }

      // Parse correct answer
      const correctLine = lines.find((line: string) =>
        /^Correct answer:/i.test(line)
      );
      const correctAnswerMatch = correctLine
        ? correctLine
            .replace(/^Correct answer:/i, "")
            .trim()
            .match(/^([A-Z])/i)
        : null;
      const correctAnswer = correctAnswerMatch
        ? correctAnswerMatch[1].toUpperCase()
        : "";

      // If the structure is invalid, retry
      if (!question || answers.length === 0 || !correctAnswer) {
        if (retryCount < MAX_RETRIES) {
          console.warn(
            `Invalid response structure, retrying newRound (${
              retryCount + 1
            }/${MAX_RETRIES})`
          );
          return newRound(retryCount + 1);
        } else {
          throw new Error(
            "Max retries exceeded due to invalid response structure."
          );
        }
      }

      // Set state
      setQuestion(question);
      setAnswers(answers);
      setCorrectAnswer(correctAnswer);
    } catch (error: any) {
      console.error("Error in newRound:", error);
      // If it's an HTTP/network error, do not retry automatically.
      if (error.message && error.message.startsWith("HTTP error")) {
        throw error;
      }
      // Retry on other errors
      if (retryCount < MAX_RETRIES) {
        return newRound(retryCount + 1);
      } else {
        throw error;
      }
    } finally {
      setLoadingGame(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto">
      {!startGame ? (
        <div className="flex flex-col flex-1 md:justify-center items-center font-ibmPlexMono md:gap-y-[10vh] gap-y-[5vh] mt-8 md:mt-0">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <p className="md:text-2xl text-lg text-white text-center">
              Mock Interview
            </p>
            <p className="max-w-[40rem] text-[#FFFFFF99] md:text-center text-start md:text-base text-xs">
              <span className="hidden md:block">
                Mock Interview is a game where you can test your knowledge of
                developer position that you are applying for. You will be
                presented with a series of questions, and you have to choose the
                correct answer from the options provided. The game is designed
                to help you improve your skills and prepare for real-life
                interviews. The interview doesnt count towards your stats.
              </span>
              <span className="md:hidden block">
                Each game offers a unique, OpenAI-generated web development
                question with three choices. Answer correctly to win and
                incorrectly to lose. Click "Start Game" when you're ready. Good
                luck!
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center md:gap-y-6 gap-y-4">
            <p className="text-center lg:text-xl md:text-lg text-base">
              Enter the position you want to practice for
            </p>
            <input
              type="text"
              placeholder="Junior Frontend React Developer"
              className="lg:w-[600px] md:w-[400px] mx-auto p-2 rounded-lg bg-[#FFFFFF33] text-white placeholder:text-[#FFFFFF99] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <button
            className="text-black rounded-xl bg-white md:p-2 p-1.5 cursor-pointer md:text-base text-sm"
            onClick={handleNewGame}
          >
            START GAME
          </button>
        </div>
      ) : loadingGame ? (
        <div className="flex w-full flex-1 items-center justify-center">
          <CircleLoading className="lg:w-10 lg:h-10 md:w-8 md:h-8 h-5 w-5 fill-[#d9d9d9]" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

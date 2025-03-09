"use client";

import Quiz from "@/components/Quiz/Quiz";
import CircleLoading from "@/ui/CircleLoading";
import { useState } from "react";
import { categories } from "@/data/categories";

export default function GamePage() {
  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [category, setCategory] = useState(categories[0]);

  const handleNewGame = () => {
    setStartGame(true);
    newRound();
  };

  async function newRound() {
    setLoadingGame(true);

    try {
      const response = await fetch(`/api/getQuestions/${category.prompt}`);
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
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto">
      {!startGame ? (
        <div className="flex flex-col flex-1 md:justify-center items-center font-ibmPlexMono md:gap-y-[10vh] gap-y-[5vh] mt-8 md:mt-0">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <p className="md:text-2xl text-lg text-white text-center">
              How the games works?
            </p>
            <p className="max-w-[40rem] text-[#FFFFFF99] md:text-center text-start md:text-base text-xs">
              {/* Each game has 10 rounds, the questions have 3 multiple choice
              questions and go from easy to hard, the goal is to get a score of
              more than 60%, if successful the user gets rewarded with a win, on
              the other hand if the score is less than 60% the user gets a loss.
              When you are ready click on start game, good luck! */}
              <span className="hidden md:block">
                Each game you get a unique web development question generated by
                openai and have 3 multiple choice answers, the goal is to select
                the right answer, if successful the user gets rewarded with a
                win, otherwise the user gets rewarded with a loss. When you are
                ready click on start game, good luck!
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
              Choose the field of the quiz
            </p>
            <div className="lg:w-[600px] md:w-[400px] mx-auto flex flex-wrap justify-center items-center gap-2">
              {categories.map((item, i) => (
                <button
                  onClick={() => {
                    setCategory(item);
                  }}
                  className={`lg:py-2 lg:px-4 md:py-1.5 md:px-2.5 py-1 px-2 lg:text-base md:text-sm text-xs bg-white text-black rounded-3xl text-center w-fit transition-all duration-300 ease-out cursor-pointer inline-block ${
                    category === item
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  key={i}
                >
                  {item.name}
                </button>
              ))}
            </div>
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
        <Quiz
          startGame={startGame}
          setStartGame={setStartGame}
          newRound={newRound}
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
          category={category.name}
        />
      )}
    </div>
  );
}

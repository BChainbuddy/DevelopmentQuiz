"use client";

import Quiz from "@/components/Quiz/Quiz";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [startGame, setStartGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  async function callAPI() {
    const response = await fetch("/api/getQuestions");
    const { data } = await response.json();
    console.log(data.choices[0].message.content);
  }

  useEffect(() => {
    // Call the backend
    callAPI();
  }, []);

  // API CALL

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto">
      {startGame ? (
        <Quiz setStartGame={setStartGame} />
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <button
            className="text-black rounded-xl bg-white p-2 cursor-pointer"
            onClick={() => {
              setStartGame(true);
            }}
          >
            START GAME
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import Quiz from "@/components/Quiz/Quiz";
import { useState } from "react";

export default function GamePage() {
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full max-w-[90rem] mx-auto">
      {startGame ? (
        <Quiz />
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

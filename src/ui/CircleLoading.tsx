"use client";

import { useMemo } from "react";

const loadingMessages = [
  "Brewing up a challenge",
  "Consulting the docs",
  "Compiling your question",
  "Reading Stack Overflow",
  "Thinking hard",
  "Almost there",
  "Finding the perfect question",
  "Debugging the quiz",
];

export default function CircleLoading() {
  const message = useMemo(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
    []
  );

  return (
    <div
      role="status"
      className="w-full h-full flex justify-center items-center flex-col gap-8"
    >
      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--foreground)] opacity-80 animate-[bounce-dot_1s_ease-in-out_infinite]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--foreground)] opacity-80 animate-[bounce-dot_1s_ease-in-out_infinite_0.15s]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--foreground)] opacity-80 animate-[bounce-dot_1s_ease-in-out_infinite_0.3s]" />
      </div>

      {/* Random message */}
      <p className="text-sm md:text-base font-medium text-[var(--muted)]">
        {message}...
      </p>
    </div>
  );
}

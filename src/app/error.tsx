"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center font-ibmPlexMono">
      <div className="text-center">
        <div className="text-6xl mb-4">:(</div>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-sm md:text-base text-[var(--muted)] mt-2 max-w-md">
          Don't worry, even the best code has bugs sometimes.
        </p>
        <button
          onClick={reset}
          className="inline-block mt-8 bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] px-6 py-3 rounded-xl font-medium transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

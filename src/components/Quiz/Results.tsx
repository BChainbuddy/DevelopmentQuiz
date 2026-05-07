"use client";

import { useState } from "react";

export default function Results({ percent }: { percent: number }) {
  const [copied, setCopied] = useState(false);
  const score = Math.round(percent * 100);

  let message = "";
  let emoji = "";
  let title = "";

  if (percent === 1) {
    title = "Perfect!";
    message = "You're ready for anything.";
    emoji = "🎉";
  } else if (percent >= 0.7) {
    title = "Great Job!";
    message = "You have solid knowledge for this role.";
    emoji = "✅";
  } else if (percent >= 0.4) {
    title = "Getting There!";
    message = "Keep practicing to improve.";
    emoji = "🧐";
  } else {
    title = "Keep Learning!";
    message = "Practice makes perfect.";
    emoji = "📚";
  }

  // Circle math: radius=54, circumference = 2 * π * 54 ≈ 339
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const shareText = `I scored ${score}% on DevQuiz interview practice! ${emoji} Test your dev skills too!`;

  const handleCopyShare = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col w-full flex-1 justify-center items-center">
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm rounded-2xl p-8 md:p-10 max-w-md w-full text-center">
        {/* Score circle */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-[var(--card-border)]"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percent * circumference} ${circumference}`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={percent >= 0.7 ? '#34d399' : percent >= 0.4 ? '#60a5fa' : '#fb923c'} />
                <stop offset="100%" stopColor={percent >= 0.7 ? '#22c55e' : percent >= 0.4 ? '#06b6d4' : '#ef4444'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold">{score}%</span>
          </div>
        </div>

        {/* Emoji */}
        <div className="text-4xl mb-4">{emoji}</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>

        {/* Message */}
        <p className="text-sm md:text-base text-[var(--muted-foreground)] mb-6">{message}</p>

        {/* Share buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={handleTwitterShare}
            className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] transition-all duration-200"
            aria-label="Share on Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            onClick={handleCopyShare}
            className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] transition-all duration-200"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Try Again button */}
        <a
          href="/interview"
          className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] hover:border-[var(--card-border-hover)] font-medium rounded-xl px-6 py-3 transition-all duration-200"
        >
          <span>Try Again</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </a>
      </div>
    </div>
  );
}

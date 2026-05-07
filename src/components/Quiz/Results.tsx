export default function Results({ percent }: { percent: number }) {
  const score = Math.round(percent * 100);

  let message = "";
  let emoji = "";
  let accentColor = "";

  if (percent === 1) {
    message = "Perfect score! You're ready for anything.";
    emoji = "🎉";
    accentColor = "from-amber-400 to-yellow-500";
  } else if (percent >= 0.7) {
    message = "Great job! You have solid knowledge for this role.";
    emoji = "✅";
    accentColor = "from-emerald-400 to-green-500";
  } else if (percent >= 0.4) {
    message = "Getting there! Keep practicing to improve.";
    emoji = "🧐";
    accentColor = "from-blue-400 to-cyan-500";
  } else {
    message = "Keep learning! Practice makes perfect.";
    emoji = "📚";
    accentColor = "from-orange-400 to-red-500";
  }

  return (
    <div className="flex flex-col w-full flex-1 justify-center items-center">
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 max-w-md w-full text-center">
        {/* Score circle */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-white/10"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percent * 283} 283`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`${percent >= 0.7 ? 'stop-color-emerald-400' : percent >= 0.4 ? 'stop-color-blue-400' : 'stop-color-orange-400'}`} stopColor={percent >= 0.7 ? '#34d399' : percent >= 0.4 ? '#60a5fa' : '#fb923c'} />
                <stop offset="100%" className={`${percent >= 0.7 ? 'stop-color-green-500' : percent >= 0.4 ? 'stop-color-cyan-500' : 'stop-color-red-500'}`} stopColor={percent >= 0.7 ? '#22c55e' : percent >= 0.4 ? '#06b6d4' : '#ef4444'} />
              </linearGradient>
            </defs>
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold">{score}%</span>
          </div>
        </div>

        {/* Emoji */}
        <div className="text-4xl mb-4">{emoji}</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Results</h2>

        {/* Message */}
        <p className="text-sm md:text-base opacity-70 mb-8">{message}</p>

        {/* Button */}
        <a
          href="/interview"
          className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 font-medium rounded-xl px-6 py-3 transition-all duration-200"
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

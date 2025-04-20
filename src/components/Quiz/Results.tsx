export default function Results({ percent }: { percent: number }) {
  let message = "";

  if (percent === 1) {
    message = "🎉 You are perfect!";
  } else if (percent > 0.7) {
    message = "✅ Great job! You have enough knowledge for this role.";
  } else if (percent > 0.4) {
    message = "🧐 You're doing okay. Do more interviews and you'll get there!";
  } else {
    message = "📚 You need to learn more. Keep practicing!";
  }

  return (
    <div className="flex flex-col w-full flex-1 justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Results</h1>
      <p className="text-lg text-gray-200 mb-4 max-w-md">{message}</p>
      <p className="text-2xl font-semibold text-white mb-6">
        You scored {(percent * 100).toFixed(0)}%
      </p>
      <a
        href="/interview"
        className="bg-white hover:bg-gray-200 text-black font-medium rounded-lg px-6 py-3 transition"
      >
        🔁 Try Again
      </a>
    </div>
  );
}

export default function Results({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <p className="text-white text-2xl">Results</p>
      <p>
        {percent === 1
          ? "You are perfect!"
          : percent > 0.7
          ? "Good job you have enough knowledge for this role!"
          : percent > 0.4
          ? "You are doing okay, do more interviews and you'll get there!"
          : "You have to learn more, you are not yet ready"}
      </p>
      <p className="text-white text-2xl">You scored {percent * 100}%</p>
      <a
        href="/interview"
        className="bg-white text-black rounded-lg px-4 py-2 mt-4"
      >
        Back to home
      </a>
    </div>
  );
}

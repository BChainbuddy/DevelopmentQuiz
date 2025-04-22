export default function StartButton({
  startGame,
  title,
}: {
  startGame: () => void;
  title: string;
}) {
  return (
    <button
      className="mt-6 bg-white text-black md:text-base text-sm md:py-2 py-1.5 md:px-4 px-3 rounded-lg hover:bg-[#FFFFFF99] active:bg-[#FFFFFF99] transition duration-300 ease-out"
      onClick={startGame}
    >
      {title}
    </button>
  );
}

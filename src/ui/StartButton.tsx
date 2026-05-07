export default function StartButton({
  startGame,
  title,
}: {
  startGame: () => void;
  title: string;
}) {
  return (
    <button
      className="mt-4 bg-white/90 hover:bg-white text-black md:text-sm text-xs font-medium md:py-3 py-2.5 md:px-8 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={startGame}
    >
      {title}
    </button>
  );
}

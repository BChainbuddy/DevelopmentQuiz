interface AnswerCardProps {
  correctAnswer: string;
  choice: string;
  answer: string;
  selectAnswer: (choice: string) => void;
  selectedAnswer: string;
}

export default function AnswerCard({
  correctAnswer,
  choice,
  selectAnswer,
  selectedAnswer,
  answer,
}: AnswerCardProps) {
  const isSelected = selectedAnswer !== "";
  const isCorrect = choice === correctAnswer;
  const wasSelected = selectedAnswer === choice;

  const getCardStyles = () => {
    if (!isSelected) {
      return "bg-[var(--card-bg)] border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] hover:border-[var(--card-border-hover)]";
    }
    if (isCorrect) {
      return "bg-emerald-500/20 border-emerald-500/50";
    }
    if (wasSelected) {
      return "bg-red-500/20 border-red-500/50";
    }
    return "bg-[var(--card-bg)] border-[var(--card-border)] opacity-50";
  };

  const getBadgeStyles = () => {
    if (!isSelected) {
      return "bg-[var(--card-bg-hover)] text-[var(--foreground)]";
    }
    if (isCorrect) {
      return "bg-emerald-500 text-white";
    }
    if (wasSelected) {
      return "bg-red-500 text-white";
    }
    return "bg-[var(--card-bg)] text-[var(--muted)]";
  };

  return (
    <div
      className={`md:max-w-[20rem] w-full min-w-[8rem] cursor-pointer rounded-2xl border backdrop-blur-sm flex flex-col transition-all duration-300 ease-out p-4 md:p-5 ${getCardStyles()} ${
        isSelected ? "pointer-events-none" : ""
      }`}
      onClick={() => selectAnswer(choice)}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${getBadgeStyles()}`}
        >
          {choice}
        </span>
        <p className="flex-1 lg:text-base md:text-sm text-xs leading-relaxed pt-1 md:pt-2">
          {answer}
        </p>
      </div>

      {isSelected && isCorrect && (
        <div className="mt-3 pt-3 border-t border-emerald-500/30 text-emerald-400 text-xs md:text-sm font-medium">
          Correct answer
        </div>
      )}
      {isSelected && wasSelected && !isCorrect && (
        <div className="mt-3 pt-3 border-t border-red-500/30 text-red-400 text-xs md:text-sm font-medium">
          Incorrect
        </div>
      )}
    </div>
  );
}

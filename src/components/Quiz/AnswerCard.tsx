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
  return (
    <div
      className={`md:max-w-[25rem] max-w-[10rem] w-full lg:aspect-[9/10] md:aspect-[8/10] min-w-[5rem] text-black cursor-pointer rounded-xl items-center flex flex-col transition-all duration-500 ease-out md:pb-0 pb-[0.5rem] ${
        selectedAnswer && choice === correctAnswer
          ? "bg-green-500"
          : selectedAnswer
          ? "bg-red-500"
          : "bg-white opacity-90 answerCard"
      }`}
      onClick={() => selectAnswer(choice)}
    >
      <p className="lg:text-xl md:text-lg text-sm md:mt-[8%] mt-[5%]">
        {choice}
      </p>
      <div className="lg:text-lg md:text-base text-xs w-[90%] text-center flex-1 flex items-center justify-center">
        <p>{answer}</p>
      </div>
    </div>
  );
}

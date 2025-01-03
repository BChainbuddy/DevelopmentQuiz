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
      className={`lg:max-w-[25rem] w-full aspect-[9/10] text-black rounded-xl relative items-center flex flex-col transition-all duration-500 ease-out ${
        selectedAnswer && choice === correctAnswer
          ? "bg-green-500"
          : selectedAnswer
          ? "bg-red-500"
          : "bg-white opacity-90"
      }`}
      onClick={() => selectAnswer(choice)}
    >
      <p className="lg:text-xl md:text-lg mt-[15%]">{choice}</p>
      <p className="lg:text-lg md:text-base w-[90%] mt-[20%] text-center">
        {answer}
      </p>
    </div>
  );
}

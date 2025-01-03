interface AnswerCardProps {
  correctAnswer: string;
  choice: string;
  answer: string;
}
export default function AnswerCard({
  correctAnswer,
  choice,
  answer,
}: AnswerCardProps) {
  return (
    <div className="lg:max-w-[25rem] w-full aspect-[9/10] text-black bg-white opacity-80 rounded-xl relative items-center flex flex-col">
      <p className="lg:text-xl md:text-lg mt-[15%]">{choice}</p>
      <p className="lg:text-lg md:text-base w-[90%] mt-[20%] text-center">
        {answer}
      </p>
    </div>
  );
}

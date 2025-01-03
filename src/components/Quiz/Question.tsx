interface QuestionProps {
  question: string;
}

export default function Question({ question }: QuestionProps) {
  return (
    <div className="flex flex-col w-fit justify-center items-center">
      <p className="border-b border-b-white lg:text-lg md:text-sm w-fit px-3">
        Question
      </p>
      <p className="lg:text-2xl md:text-xl mt-2 text-white">{question}</p>
    </div>
  );
}

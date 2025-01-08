interface QuestionProps {
  question: string;
}

export default function Question({ question }: QuestionProps) {
  return (
    <div className="flex flex-col w-fit justify-center items-center">
      <p className="border-b border-b-white lg:text-lg md:text-base text-sm w-fit px-3">
        Question
      </p>
      <p className="lg:text-2xl md:text-xl text-lg md:mt-2 mt-1 text-white text-center">
        {question}
      </p>
    </div>
  );
}

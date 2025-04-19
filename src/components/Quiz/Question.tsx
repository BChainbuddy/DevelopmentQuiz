interface QuestionProps {
  question: string;
  rounds?: string;
}

export default function Question({ question, rounds }: QuestionProps) {
  return (
    <div className="flex flex-col w-fit justify-center items-center">
      <p className="border-b border-b-white lg:text-lg md:text-base text-xs w-fit px-3">
        Question {rounds ? rounds : ""}
      </p>
      <p className="lg:text-2xl md:text-xl text-base md:mt-2 mt-1 text-white text-center">
        {question}
      </p>
    </div>
  );
}

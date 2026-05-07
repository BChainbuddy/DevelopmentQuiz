interface QuestionProps {
  question: string;
  rounds?: string;
}

export default function Question({ question, rounds }: QuestionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto text-center px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <p className="text-xs md:text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
          Question
        </p>
        {rounds && (
          <span className="bg-[var(--card-bg)] border border-[var(--card-border)] px-3 py-1 rounded-full text-xs md:text-sm font-medium">
            {rounds}
          </span>
        )}
      </div>
      <h2 className="lg:text-2xl md:text-xl text-lg leading-relaxed font-medium">
        {question}
      </h2>
    </div>
  );
}

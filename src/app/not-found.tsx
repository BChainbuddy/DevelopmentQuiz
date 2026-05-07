import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center font-ibmPlexMono">
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-bold text-[var(--muted)]">404</p>
        <h1 className="text-2xl md:text-3xl font-semibold mt-4">
          Page not found
        </h1>
        <p className="text-sm md:text-base text-[var(--muted)] mt-2 max-w-md">
          Looks like this page took a coffee break and never came back.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg-hover)] px-6 py-3 rounded-xl font-medium transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

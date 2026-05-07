export default function Footer() {
  return (
    <footer className="md:py-4 py-2 text-center text-sm">
      <p>
        Built by{" "}
        <a
          href="https://github.com/BChainbuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--muted)]"
        >
          bchainbuddy (Jaka Potokar)
        </a>
      </p>
      <div className="mt-2 md:block hidden">
        <a
          href="https://github.com/BChainbuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-[var(--muted)]"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/YourTwitterHandle"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-[var(--muted)]"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/YourLinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-[var(--muted)]"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-sm text-[var(--muted)] mt-2">
        &copy; {new Date().getFullYear()} DevQuiz. All rights reserved.
      </p>
    </footer>
  );
}

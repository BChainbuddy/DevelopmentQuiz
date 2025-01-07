export default function Footer() {
  return (
    <footer className="text-white py-4 text-center text-sm">
      <p>
        Built by{" "}
        <a
          href="https://github.com/BChainbuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-400"
        >
          bchainbuddy (Jaka Potokar)
        </a>
      </p>
      <div className="mt-2">
        <a
          href="https://github.com/BChainbuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-gray-400"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/YourTwitterHandle"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-gray-400"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/YourLinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-gray-400"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-2">
        &copy; {new Date().getFullYear()} DevQuiz. All rights reserved.
      </p>
    </footer>
  );
}

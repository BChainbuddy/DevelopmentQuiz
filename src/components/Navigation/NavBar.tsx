import Link from "next/link";
import NavOption from "./NavOption";

export default function Navbar() {
  const separatorClass = "lg:text-xl md:text-lg";
  return (
    <div className="w-full flex flex-row items-end justify-between max-w-[90rem] mx-auto lg:py-10 md:py-6">
      <Link
        className="font-inriaSans lg:text-5xl md:text-4xl text-2xl"
        href="/"
      >
        DevQuiz
      </Link>
      <div className="flex flex-row justify-center items-end lg:space-x-2 md:space-x-1 font-inter">
        <NavOption href="/game" name="Game" />
        <p className={separatorClass}>I</p>
        <NavOption href="/profile" name="Profile" />
        <p className={separatorClass}>I</p>
        <NavOption href="/leaderboard" name="Leaderboard" />
      </div>
    </div>
  );
}

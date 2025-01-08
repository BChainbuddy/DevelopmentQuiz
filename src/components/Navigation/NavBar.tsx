import Link from "next/link";
import NavOption from "./NavOption";
import NavOptions from "./NavOptions";
import SmNavBar from "./SmNavBar";

export default function Navbar() {
  return (
    <div className="w-full flex flex-row items-end justify-between max-w-[90rem] mx-auto lg:py-10 md:py-6 py-4">
      <Link
        className="font-inriaSans lg:text-5xl md:text-4xl text-3xl"
        href="/"
      >
        DevQuiz
      </Link>
      <NavOptions />
      <SmNavBar />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavOptions from "./NavOptions";
import SmNavBar from "./SmNavBar";

export default function Navbar() {
  const pathname = usePathname();

  const hideNavbar = pathname === "/" || pathname.startsWith("/api/auth");

  if (hideNavbar) return null;

  return (
    <nav className="sticky top-0 z-30 w-full backdrop-blur-md bg-[var(--background)]/80 border-b border-white/10">
      <div className="w-full flex flex-row items-center justify-between max-w-[90rem] mx-auto lg:py-6 md:py-5 py-4 px-[10%]">
        <Link
          className="font-inriaSans lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
          href="/"
        >
          DevQuiz
        </Link>
        <NavOptions />
        <SmNavBar />
      </div>
    </nav>
  );
}

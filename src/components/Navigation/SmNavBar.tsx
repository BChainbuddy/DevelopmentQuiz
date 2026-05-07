"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmNavOption from "./SmNavOption";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function SmNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const navOptions = [
    { href: "/quiz", name: "Quiz" },
    { href: "/interview", name: "Interview" },
    { href: "/profile", name: "Profile" },
    { href: "/leaderboard", name: "Leaderboard" },
  ];

  if (pathname === "/") return null;

  return (
    <>
      <motion.button
        className="fixed right-4 top-4 p-2 md:hidden flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] rounded-lg border border-[var(--card-border)] z-50 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed md:hidden top-0 left-0 right-0 bottom-0 h-screen w-screen bg-[var(--background)] z-40 flex flex-col justify-center items-center gap-y-8"
          >
            {navOptions.map((item, i) => (
              <SmNavOption
                href={item.href}
                key={i}
                name={item.name}
                setIsMenuOpen={setIsMenuOpen}
              />
            ))}
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

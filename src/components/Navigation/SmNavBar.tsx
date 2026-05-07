"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmNavOption from "./SmNavOption";
import { usePathname } from "next/navigation";

export default function SmNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const navOptions = [
    { href: "/quiz", name: "Quiz" },
    { href: "/interview", name: "Interview" },
    { href: "/profile", name: "Profile" },
    { href: "/leaderboard", name: "Leaderboard" },
  ];

  return (
    <>
      {pathname !== "/" && (
        <>
          <motion.button
            className="fixed right-4 top-4 p-2 md:hidden flex items-center justify-center bg-[var(--background)] rounded-lg border border-[var(--card-border)] z-50 backdrop-blur-sm"
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
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 80, damping: 12 }}
                className="fixed md:hidden top-0 right-0 w-[70%] min-w-[12rem] h-full bg-[var(--background)]/95 backdrop-blur-md z-40 flex flex-col justify-center items-center p-6 border-l border-[var(--card-border)] gap-y-6"
              >
                {navOptions.map((item, i) => (
                  <SmNavOption
                    href={item.href}
                    key={i}
                    name={item.name}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

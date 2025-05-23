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
            className="fixed right-3 top-3 p-1.5 md:hidden flex items-center justify-center bg-[#FFF] rounded-full border-2 border-white z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
              <span className="bg-white hamburger-top"></span>
              <span className="bg-white hamburger-middle"></span>
              <span className="bg-white hamburger-bottom"></span>
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
                className="fixed md:hidden top-0 right-0 w-[70%] min-w-[10rem] h-full bg-gray-500 z-40 flex flex-col justify-center items-center p-4 opacity-95 border-l border-gray-600 shadow-[-2px_0px_0px_#000000] gap-y-5"
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

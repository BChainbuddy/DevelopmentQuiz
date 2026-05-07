"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/categories";

interface CategoryDropdownProps {
  setCategory: (category: string) => void;
  className?: string;
}

export default function CategoryDropdown({
  setCategory,
  className,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (cat: string) => {
    setSelectedCategory(cat);
    setCategory(cat);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative font-inter ${className ? className : "md:w-60 w-36"}`}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-4 py-2 bg-[var(--background)]/80 backdrop-blur-md border border-[var(--card-border)] rounded-lg flex justify-between items-center transition-all duration-200 hover:border-[var(--card-border-hover)] focus:outline-none focus:border-[var(--card-border-hover)]"
      >
        <span className="md:text-sm text-xs font-medium">
          {selectedCategory}
        </span>
        <svg
          className={`md:h-4 md:w-4 h-3.5 w-3.5 text-[var(--muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute mt-2 w-full bg-[var(--background)]/95 backdrop-blur-md border border-[var(--card-border)] rounded-lg shadow-lg z-20 overflow-hidden"
          >
            <ul className="max-h-60 overflow-auto py-1">
              <li
                onClick={() => handleSelect("All")}
                className={`md:px-4 py-2.5 px-3 cursor-pointer md:text-sm text-xs transition-all duration-150 ${
                  selectedCategory === "All"
                    ? "bg-[var(--card-bg-hover)] font-medium"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                }`}
              >
                All
              </li>
              {categories.map((cat, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(cat.name)}
                  className={`md:px-4 py-2.5 px-3 cursor-pointer md:text-sm text-xs transition-all duration-150 ${
                    selectedCategory === cat.name
                      ? "bg-[var(--card-bg-hover)] font-medium"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

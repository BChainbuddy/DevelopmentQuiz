"use client";

import { useState, useRef, useEffect } from "react";
import { categories } from "@/data/categories";

interface CategoryDropdownProps {
  setCategory: (category: string) => void;
}

export default function CategoryDropdown({
  setCategory,
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
    <div className="relative md:w-60 w-32" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="md:text-base text-sm">{selectedCategory}</span>
        <svg
          className={`md:h-5 md:w-5 h-4 w-4 transition-transform duration-200 ${
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
      {isOpen && (
        <div className="absolute mt-1 w-full bg-slate-800 rounded-md shadow-lg z-10">
          <ul className="max-h-60 overflow-auto">
            <li
              key={0}
              onClick={() => handleSelect("All")}
              className="md:px-4 py-2 px-2.5 text-white hover:bg-slate-700 cursor-pointer md:text-base text-xs"
            >
              All
            </li>
            {categories.map((cat, i) => (
              <li
                key={i}
                onClick={() => handleSelect(cat.name)}
                className="md:px-4 py-2 px-2.5 text-white hover:bg-slate-700 cursor-pointer md:text-base text-xs"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

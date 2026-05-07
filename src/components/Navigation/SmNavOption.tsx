"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SmNavOptionProps {
  href: string;
  name: string;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function SmNavOption({
  href,
  name,
  setIsMenuOpen,
}: SmNavOptionProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => setIsMenuOpen(false)}
      className={`font-inter text-lg transition-opacity ${
        isActive ? "font-semibold opacity-100" : "font-medium opacity-60"
      }`}
    >
      {name}
    </Link>
  );
}

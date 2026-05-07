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
      className={`font-inter text-2xl py-3 px-8 rounded-xl transition-all duration-200 ${
        isActive
          ? "font-semibold bg-[var(--foreground)] text-[var(--background)]"
          : "font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      }`}
    >
      {name}
    </Link>
  );
}

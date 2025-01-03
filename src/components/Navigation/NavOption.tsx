"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavOptionProps {
  name: string;
  href: string;
}

export default function NavOption({ name, href }: NavOptionProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`lg:text-xl md:text-lg text-base cursor-pointer hover:opacity-100 border-b-2 border-transparent transition-all duration-300 ${
        href === pathname
          ? "font-semibold opacity-100 border-b-white"
          : "opacity-80"
      }`}
    >
      {name}
    </Link>
  );
}

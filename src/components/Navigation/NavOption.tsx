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
      className={`lg:text-xl md:text-lg text-base cursor-pointer transition-all duration-300 navOption ${
        href === pathname
          ? "font-semibold opacity-100 active"
          : "opacity-80 hover:opacity-100"
      }`}
    >
      {name}
    </Link>
  );
}

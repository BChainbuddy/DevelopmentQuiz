"use client";

import { usePathname } from "next/navigation";
import NavOption from "./NavOption";

export default function NavOptions() {
  const pathname = usePathname();

  const navItems = [
    { href: "/interview", name: "Interview" },
    { href: "/quiz", name: "Quiz" },
    { href: "/profile", name: "Profile" },
    { href: "/leaderboard", name: "Leaderboard" },
  ];

  return (
    <div className="md:flex hidden flex-row justify-center items-center lg:gap-6 md:gap-4 font-inter">
      {pathname !== "/" &&
        navItems.map((item, index) => (
          <div key={item.href} className="flex items-center lg:gap-6 md:gap-4">
            <NavOption href={item.href} name={item.name} />
            {index < navItems.length - 1 && (
              <span className="w-1 h-1 rounded-full bg-current opacity-30" />
            )}
          </div>
        ))}
    </div>
  );
}

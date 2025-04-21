"use client";

import { usePathname } from "next/navigation";
import NavOption from "./NavOption";

export default function NavOptions() {
  const pathname = usePathname();

  const separatorClass = "lg:text-xl md:text-lg";

  return (
    <div className="md:flex hidden flex-row justify-center items-end lg:space-x-2 md:space-x-1 font-inter">
      {pathname !== "/" && (
        <>
          <NavOption href="/interview" name="Interview" />
          <p className={separatorClass}>I</p>
          <NavOption href="/quiz" name="Quiz" />
          <p className={separatorClass}>I</p>
          <NavOption href="/profile" name="Profile" />
          <p className={separatorClass}>I</p>
          <NavOption href="/leaderboard" name="Leaderboard" />
        </>
      )}
    </div>
  );
}

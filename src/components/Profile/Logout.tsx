"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="lg:py-2 md:py-1.5 py-1 lg:w-[8rem] md:w-[6rem] w-[5rem] lg:text-lg md:text-base text-sm rounded-2xl bg-[#FFFFFF90] hover:bg-[#FFFFFF] text-black transition-all duration-300 ease-in-out"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}

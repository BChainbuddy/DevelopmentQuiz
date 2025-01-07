"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="py-2 w-[8rem] text-lg rounded-2xl bg-[#FFFFFF90] hover:bg-[#FFFFFF] text-black transition-all duration-300 ease-in-out"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

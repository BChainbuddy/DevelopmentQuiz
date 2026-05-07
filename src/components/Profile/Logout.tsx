"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="lg:py-2 md:py-1.5 py-1.5 lg:px-5 md:px-4 px-4 lg:text-sm md:text-xs text-xs font-medium rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}

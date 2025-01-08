"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="lg:text-2xl lg:px-14 lg:py-5 md:text-xl md:px-12 md:py-4 text-lg px-6 py-3 rounded-3xl bg-[#FFFFFF90] text-black hover:bg-[#FFF] transition-all duration-300 ease-in-out"
      onClick={() => signIn("google", { callbackUrl: "/game" })}
    >
      Login via GMAIL
    </button>
  );
}

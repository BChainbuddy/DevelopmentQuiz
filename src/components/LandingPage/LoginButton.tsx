"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="text-2xl px-14 py-5 rounded-3xl bg-[#FFFFFF90] text-black hover:bg-[#FFF] transition-all duration-300 ease-in-out"
      onClick={() => signIn("google", { callbackUrl: "/game" })}
    >
      Login via GMAIL
    </button>
  );
}

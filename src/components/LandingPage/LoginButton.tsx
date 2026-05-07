"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <>
      <button
        className="lg:text-2xl lg:px-14 lg:py-5 md:text-xl md:px-12 md:py-4 text-lg px-6 py-3 rounded-3xl bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all duration-300 ease-in-out"
        onClick={() => signIn("google", { callbackUrl: "/quiz" })}
      >
        Login via GMAIL
      </button>
      <button
        onClick={() => signIn("credentials", { callbackUrl: "/quiz" })}
        className="lg:text-lg md:text-base text-sm hover:text-[var(--muted)] transition-colors duration-300 ease-in-out border border-[var(--foreground)] rounded-2xl md:px-2 px-1.5 py-0.5"
      >
        Continue as Guest
      </button>
    </>
  );
}

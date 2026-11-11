"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingToast from "@/ui/LoadingToast";

type Pending = "google" | "guest" | null;

export default function LoginButton() {
  const [pending, setPending] = useState<Pending>(null);

  // signIn redirects, so the flag stays set until the browser navigates away.
  const handleSignIn = (provider: "google" | "credentials") => {
    setPending(provider === "google" ? "google" : "guest");
    signIn(provider, { callbackUrl: "/quiz" }).catch(() => setPending(null));
  };

  return (
    <>
      <button
        disabled={pending !== null}
        className="lg:text-2xl lg:px-14 lg:py-5 md:text-xl md:px-12 md:py-4 text-lg px-6 py-3 rounded-3xl bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={() => handleSignIn("google")}
      >
        Login via GMAIL
      </button>
      <button
        disabled={pending !== null}
        onClick={() => handleSignIn("credentials")}
        className="lg:text-lg md:text-base text-sm hover:text-[var(--muted)] transition-colors duration-300 ease-in-out border border-[var(--foreground)] rounded-2xl md:px-2 px-1.5 py-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending === "guest" ? "Signing in..." : "Continue as Guest"}
      </button>

      <LoadingToast
        show={pending !== null}
        message={
          pending === "guest"
            ? "Signing you in as guest..."
            : "Redirecting to Google..."
        }
      />
    </>
  );
}

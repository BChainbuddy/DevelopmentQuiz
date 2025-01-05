"use client";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      {/* <main></main> */}
      {/* <p className="text-6xl">HELLO WORLD!</p> */}
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
      <button className="" onClick={() => signIn()}>
        Sign in
      </button>
      <button className="" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

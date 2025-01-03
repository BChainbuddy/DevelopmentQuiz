"use client";

import { useEffect } from "react";

export default function Home() {
  // async function callAPI() {
  //   const response = await fetch("/api/getQuestions");
  //   const { data } = await response.json();
  //   console.log(data.choices[0].message.content);
  // }

  // useEffect(() => {
  //   // Call the backend
  //   callAPI();
  // }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <main></main> */}
      {/* <p className="text-6xl">HELLO WORLD!</p> */}
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
    </div>
  );
}

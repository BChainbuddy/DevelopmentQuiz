"use client";

import { useState } from "react";

interface ToggleAccountProps {
  loading: boolean;
  getData: () => void;
}

export default function ToggleAccount({
  loading,
  getData,
}: ToggleAccountProps) {
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  const handleToggle = async () => {
    setIsPublic(!isPublic);
    // Change db to private or public

    getData();
  };

  return (
    <div className="flex flex-col font-inter items-center flex-1">
      <div className="text-xl">Public Account</div>
      <button
        className="h-[40px] w-[100px] bg-[#D9D9D9] rounded-full mt-4 relative"
        onClick={getData}
        disabled={loading}
      >
        <div
          className={`rounded-full h-[38px] w-[38px] absolute top-[1px] transition-all duration-500 ${
            isPublic ? "bg-green-500 right-[2px]" : "bg-red-500 left-[2px]"
          }`}
        ></div>
      </button>
      <p className="border-b-2 text-xl mt-16">YOUR RANK</p>
      <p className="text-4xl">12th</p>
    </div>
  );
}

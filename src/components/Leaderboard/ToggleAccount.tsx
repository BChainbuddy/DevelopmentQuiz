"use client";

import { togglePublic } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ToggleAccountProps {
  getData: () => void;
}

export default function ToggleAccount({ getData }: ToggleAccountProps) {
  const [isPublic, setIsPublic] = useState<boolean>();
  const [rank, setRank] = useState<number>(0);

  const { data: session } = useSession();

  const handleToggle = async (e: any) => {
    await togglePublic(session?.user?.email ?? "", !isPublic);

    setIsPublic(!isPublic);
    setRank(0);

    getData();
  };

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`);
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }

    const data = await response.json();
    setIsPublic(data.data.public);
  };

  const getRank = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}/rank`);
    if (!response.ok) {
      throw new Error("Error fetching user rank");
    }

    const data = await response.json();
    setRank(data.rank);
  };

  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, [session]);

  useEffect(() => {
    if (isPublic) {
      getRank();
    }
  }, [isPublic]);

  return (
    <div className="flex flex-col font-inter items-center flex-1">
      <div className="text-xl">Public Account</div>
      <button
        className="h-[40px] w-[100px] bg-[#D9D9D9] rounded-full mt-4 relative"
        onClick={handleToggle}
      >
        <div
          className={`rounded-full h-[38px] w-[38px] absolute top-[1px] transition-all duration-500 ${
            isPublic
              ? "bg-green-500 translate-x-[60px]"
              : "bg-red-500 translate-x-[2px]"
          }`}
        ></div>
      </button>
      <p className="border-b-2 text-xl mt-16">YOUR RANK</p>
      <p className="text-4xl">{rank ? rank : ""}</p>
    </div>
  );
}

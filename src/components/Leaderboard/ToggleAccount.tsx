"use client";

import { togglePublic } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CategoryDropdown from "../Profile/CategoryDropdown";

interface ToggleAccountProps {
  getData: () => void;
  setCategory: (category: string) => void;
}

export default function ToggleAccount({
  getData,
  setCategory,
}: ToggleAccountProps) {
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
    <div className="flex flex-col font-inter items-center flex-1 md:order-2 order-1">
      <CategoryDropdown
        className="lg:w-48 md:w-48 w-36"
        setCategory={setCategory}
      />
      <div className="md:text-xl text-lg mt-8">Public Account</div>
      <button
        className="md:h-[40px] md:w-[100px] w-[75px] h-[30px] bg-[#D9D9D9] rounded-full mt-4 relative"
        onClick={handleToggle}
      >
        <div
          className={`rounded-full md:h-[38px] md:w-[38px] h-[28px] w-[28px] absolute top-[1px] transition-all duration-500 ${
            isPublic
              ? "bg-green-500 md:translate-x-[60px] translate-x-[45px]"
              : "bg-red-500 translate-x-[2px]"
          }`}
        ></div>
      </button>
      <p className="border-b-2 md:text-xl text-lg md:mt-16 mt-8">YOUR RANK</p>
      <p className="md:text-4xl text-2xl md:h-[36px] h-[24px]">
        {rank ? rank : ""}
      </p>
    </div>
  );
}

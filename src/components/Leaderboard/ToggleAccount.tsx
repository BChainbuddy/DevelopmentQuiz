"use client";

import { togglePublic } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CategoryDropdown from "../Profile/CategoryDropdown";

interface ToggleAccountProps {
  getData: () => void;
  setCategory: (category: string) => void;
  category: string;
}

export default function ToggleAccount({
  getData,
  setCategory,
  category,
}: ToggleAccountProps) {
  const [isPublic, setIsPublic] = useState<boolean>();
  const [rank, setRank] = useState<number>(0);

  const { data: session } = useSession();

  const handleToggle = async () => {
    await togglePublic(session?.user?.email ?? "", !isPublic);

    setIsPublic(!isPublic);
    setRank(0);

    getData();
  };

  const getUserData = async () => {
    const response = await fetch(`/api/user/${session?.user?.email}`);
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }

    const data = await response.json();
    setIsPublic(data.data.public);
  };

  const getRank = async () => {
    const response = await fetch(
      `/api/user/${session?.user?.email}/${category}/rank`
    );
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
  }, [isPublic, category]);

  return (
    <div className="flex flex-col font-inter items-center flex-1 md:order-2 order-1 gap-y-6">
      <CategoryDropdown
        className="lg:w-48 md:w-48 w-36"
        setCategory={setCategory}
      />

      <div className="flex flex-col items-center gap-y-3 mt-4">
        <p className="md:text-base text-sm font-medium text-[var(--muted-foreground)]">Public Account</p>
        <button
          className="md:h-[32px] md:w-[60px] w-[52px] h-[28px] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full relative transition-colors hover:bg-[var(--card-bg-hover)]"
          onClick={handleToggle}
        >
          <div
            className={`rounded-full md:h-[26px] md:w-[26px] h-[22px] w-[22px] absolute top-[2px] transition-all duration-300 ${
              isPublic
                ? "bg-emerald-500 md:translate-x-[31px] translate-x-[27px]"
                : "bg-[var(--muted)] translate-x-[3px]"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-y-2 mt-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-8 py-5 backdrop-blur-sm">
        <p className="md:text-sm text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Your Rank</p>
        <p className="md:text-5xl text-3xl font-bold">
          {rank ? `#${rank}` : "—"}
        </p>
      </div>
    </div>
  );
}

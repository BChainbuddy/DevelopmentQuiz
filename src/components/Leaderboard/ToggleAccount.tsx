"use client";

import { togglePublic } from "@/actions/actions";
import { queryKeys, useUserProfile, useUserRank } from "@/hooks/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CategoryDropdown from "../Profile/CategoryDropdown";

interface ToggleAccountProps {
  setCategory: (category: string) => void;
  category: string;
}

export default function ToggleAccount({
  setCategory,
  category,
}: ToggleAccountProps) {
  const { data: session } = useSession();
  const username = session?.user?.email ?? undefined;

  const queryClient = useQueryClient();

  const { data: profile } = useUserProfile(username);
  const isPublic = profile?.public ?? false;

  const { data: rank } = useUserRank(username, category, isPublic);

  const toggleMutation = useMutation({
    mutationFn: (nextPublic: boolean) =>
      togglePublic(username ?? "", nextPublic),
    onMutate: async (nextPublic) => {
      // Flip the switch immediately; the refetch below confirms it.
      const key = queryKeys.userProfile(username ?? "");
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<{ public: boolean } | null>(key);
      queryClient.setQueryData(key, (old: { public: boolean } | null) =>
        old ? { ...old, public: nextPublic } : old
      );
      return { previous, key };
    },
    onError: (_error, _nextPublic, context) => {
      if (context) {
        queryClient.setQueryData(context.key, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(username ?? ""),
      });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["userRank"] });
    },
  });

  return (
    <div className="flex flex-col font-inter items-center flex-1 md:order-2 order-1 gap-y-6">
      <CategoryDropdown
        className="lg:w-48 md:w-48 w-36"
        setCategory={setCategory}
      />

      <div className="flex flex-col items-center gap-y-3 mt-4">
        <p className="md:text-base text-sm font-medium text-[var(--muted-foreground)]">Public Account</p>
        <button
          className="md:h-[32px] md:w-[60px] w-[52px] h-[28px] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full relative transition-colors hover:bg-[var(--card-bg-hover)] disabled:opacity-60"
          disabled={!username || toggleMutation.isPending}
          onClick={() => toggleMutation.mutate(!isPublic)}
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
          {isPublic && rank ? `#${rank}` : "—"}
        </p>
      </div>
    </div>
  );
}

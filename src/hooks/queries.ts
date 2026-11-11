"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface AggregatedUserGames {
  userId: string;
  _sum: {
    wins: number | null;
    losses: number | null;
  };
}

export interface CategoryStat {
  categoryName: string;
  wins: number;
  losses: number;
}

export interface ProfileStats {
  categories: CategoryStat[];
  totals: { wins: number; losses: number };
  bestCategory: {
    name: string;
    winRate: string;
    wins: number;
    losses: number;
  } | null;
}

export const queryKeys = {
  leaderboard: (category: string) => ["leaderboard", category] as const,
  profileStats: (username: string) => ["profileStats", username] as const,
  userProfile: (username: string) => ["userProfile", username] as const,
  userRank: (username: string, category: string) =>
    ["userRank", username, category] as const,
};

async function getJson<T>(url: string): Promise<T> {
  // React Query owns the caching; the browser must not serve a stale copy.
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }
  return response.json();
}

export function useLeaderboard(category: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.leaderboard(category),
    queryFn: async () => {
      const { data } = await getJson<{ data: AggregatedUserGames[] }>(
        `/api/users/${category}`
      );
      return data ?? [];
    },
    enabled,
    // Keep the previous category's rows on screen while the new ones load.
    placeholderData: (previous) => previous,
  });
}

export function useProfileStats(username: string | undefined) {
  return useQuery({
    queryKey: queryKeys.profileStats(username ?? ""),
    queryFn: () => getJson<ProfileStats>(`/api/usergames/${username}/all`),
    enabled: Boolean(username),
  });
}

export function useUserProfile(username: string | undefined) {
  return useQuery({
    queryKey: queryKeys.userProfile(username ?? ""),
    queryFn: async () => {
      const { data } = await getJson<{ data: { public: boolean } | null }>(
        `/api/user/${username}`
      );
      return data;
    },
    enabled: Boolean(username),
  });
}

export function useUserRank(
  username: string | undefined,
  category: string,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.userRank(username ?? "", category),
    queryFn: async () => {
      const { rank } = await getJson<{ rank: number }>(
        `/api/user/${username}/${category}/rank`
      );
      return rank;
    },
    enabled: Boolean(username) && enabled,
    placeholderData: (previous) => previous,
  });
}

/**
 * Everything that changes when a game is played or an account is made
 * public/private. Call after a mutation so the cached numbers refresh.
 */
export function useInvalidateStats() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    queryClient.invalidateQueries({ queryKey: ["profileStats"] });
    queryClient.invalidateQueries({ queryKey: ["userRank"] });
  };
}

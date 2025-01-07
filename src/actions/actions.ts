"use server";

import prisma from "@/lib/db";

export async function createProfile(username: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });
  if (!profile) {
    await prisma.profile.create({
      data: {
        username,
      },
    });
  }
}

export async function togglePublic(username: string, isPublic: boolean) {
  await prisma.profile.update({
    where: { username },
    data: {
      public: isPublic,
    },
  });
}

export async function addWin(username: string) {
  const data = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });
  if (data) {
    await prisma.profile.update({
      where: {
        username: username,
      },
      data: {
        wins: data?.wins + 1,
      },
    });
  }
}

export async function addLoss(username: string) {
  const data = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });
  if (data) {
    await prisma.profile.update({
      where: {
        username: username,
      },
      data: {
        losses: data?.losses + 1,
      },
    });
  }
}

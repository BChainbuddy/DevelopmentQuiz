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

export async function addWin(username: string) {}

export async function addLoss(username: string) {}

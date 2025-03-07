"use server";

import prisma from "@/lib/db";

export async function createProfile(username: string) {
  console.log("Creating profile for", username);
  const profile = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });
  if (!profile) {
    console.log("Profile not found, creating...");
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

export async function addWin(username: string, category: string) {
  await prisma.userGames.upsert({
    where: {
      userId_categoryName: { userId: username, categoryName: category },
    },
    update: { wins: { increment: 1 } },
    create: {
      userId: username,
      categoryName: category,
      wins: 1,
      losses: 0,
    },
  });
}

export async function addLoss(username: string, category: string) {
  await prisma.userGames.upsert({
    where: {
      userId_categoryName: { userId: username, categoryName: category },
    },
    update: { losses: { increment: 1 } },
    create: {
      userId: username,
      categoryName: category,
      wins: 0,
      losses: 1,
    },
  });
}

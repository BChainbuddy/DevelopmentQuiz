-- CreateTable
CREATE TABLE "Profile" (
    "username" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "UserGames" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserGames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Profile_username_idx" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserGames_userId_categoryName_key" ON "UserGames"("userId", "categoryName");

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

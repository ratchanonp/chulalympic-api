-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REPORTER');

-- CreateEnum
CREATE TYPE "ScoreType" AS ENUM ('POINT', 'TIME');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETE', 'SCORED');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('REGULAR', 'QUALIFYING', 'QUARTER_FINAL', 'SEMI_FINAL', 'FINAL');

-- CreateEnum
CREATE TYPE "Medal" AS ENUM ('Gold', 'Silver', 'Bronze');

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SportCategory" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sportCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "venueId" INTEGER NOT NULL,
    "sportCode" TEXT NOT NULL,
    "sportCategoryCode" TEXT NOT NULL,
    "participantId" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "facultyId" INTEGER NOT NULL,
    "scoreType" "ScoreType" NOT NULL DEFAULT 'POINT',
    "value" INTEGER NOT NULL,
    "medal" "Medal",
    "status" "GameStatus" NOT NULL,
    "type" "GameType" NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'REPORTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sport_code_key" ON "Sport"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SportCategory_code_key" ON "SportCategory"("code");

-- AddForeignKey
ALTER TABLE "SportCategory" ADD CONSTRAINT "SportCategory_sportCode_fkey" FOREIGN KEY ("sportCode") REFERENCES "Sport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_sportCode_fkey" FOREIGN KEY ("sportCode") REFERENCES "Sport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_sportCategoryCode_fkey" FOREIGN KEY ("sportCategoryCode") REFERENCES "SportCategory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

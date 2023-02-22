/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Participant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId,facultyId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_reporterId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "reporterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_gameId_facultyId_key" ON "Participant"("gameId", "facultyId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

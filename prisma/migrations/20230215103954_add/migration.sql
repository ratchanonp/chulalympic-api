/*
  Warnings:

  - You are about to drop the column `participantId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Medal" ADD VALUE 'None';

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_participantId_fkey";

-- DropForeignKey
ALTER TABLE "SportCategory" DROP CONSTRAINT "SportCategory_sportCode_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "participantId",
ALTER COLUMN "status" SET DEFAULT 'SCHEDULED',
ALTER COLUMN "type" SET DEFAULT 'REGULAR';

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "name",
DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ALTER COLUMN "value" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "SportCategory" ADD CONSTRAINT "SportCategory_sportCode_fkey" FOREIGN KEY ("sportCode") REFERENCES "Sport"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

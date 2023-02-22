/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

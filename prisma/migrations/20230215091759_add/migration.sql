/*
  Warnings:

  - Added the required column `reporterId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "reporterId" INTEGER NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "GameStatus" NOT NULL,
ADD COLUMN     "type" "GameType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

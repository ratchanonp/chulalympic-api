/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");

/*
  Warnings:

  - A unique constraint covering the columns `[sportCode,name]` on the table `SportCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SportCategory" ADD CONSTRAINT "SportCategory_pkey" PRIMARY KEY ("sportCode", "code");

-- CreateIndex
CREATE UNIQUE INDEX "SportCategory_sportCode_name_key" ON "SportCategory"("sportCode", "name");

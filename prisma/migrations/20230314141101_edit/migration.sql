/*
  Warnings:

  - A unique constraint covering the columns `[sportCode,name]` on the table `SportCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_sportCategoryCode_fkey";

-- DropIndex
DROP INDEX "SportCategory_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "SportCategory_sportCode_name_key" ON "SportCategory"("sportCode", "name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_sportCode_sportCategoryCode_fkey" FOREIGN KEY ("sportCode", "sportCategoryCode") REFERENCES "SportCategory"("sportCode", "code") ON DELETE RESTRICT ON UPDATE CASCADE;

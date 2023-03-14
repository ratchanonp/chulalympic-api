-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_venueId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

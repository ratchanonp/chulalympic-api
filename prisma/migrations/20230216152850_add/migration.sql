-- DropIndex
DROP INDEX "Participant_gameId_facultyId_key";

-- AlterTable
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("gameId", "facultyId");

-- View: chulalympic.MedalCount

-- DROP VIEW chulalympic."MedalCount";

CREATE OR REPLACE VIEW "MedalCount"
 AS
 SELECT DISTINCT "F".id,
    "F".name,
    count(
        CASE
            WHEN "P".medal = 'Gold' THEN 1
        END)::integer AS gold,
    count(
        CASE
            WHEN "P".medal = 'Silver' THEN 1
        END)::integer AS silver,
    count(
        CASE
            WHEN "P".medal = 'Bronze' THEN 1
        END)::integer AS bronze,
    count(
        CASE
            WHEN "P".medal IS NOT NULL THEN 1
        END)::integer AS "Total"
   FROM "Faculty" "F"
     LEFT JOIN "Participant" "P" ON "F".id = "P"."facultyId"
  GROUP BY "F".id
  ORDER BY "Total" DESC, "gold" DESC, "silver" DESC, "bronze" DESC, "F".id ASC;
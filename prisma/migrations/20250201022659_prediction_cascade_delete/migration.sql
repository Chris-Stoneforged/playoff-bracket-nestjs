-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_tournament_id_fkey";

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

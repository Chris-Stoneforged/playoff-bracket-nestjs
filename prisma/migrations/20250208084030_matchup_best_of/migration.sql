-- AlterTable
ALTER TABLE "Matchup" ADD COLUMN     "best_of" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "number_of_games" INTEGER NOT NULL DEFAULT 3;

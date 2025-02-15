-- AlterTable
ALTER TABLE "Matchup" ADD COLUMN     "team_a_wins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "team_b_wins" INTEGER NOT NULL DEFAULT 0;

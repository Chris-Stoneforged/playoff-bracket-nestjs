-- AlterTable
ALTER TABLE "Bracket" ADD COLUMN     "left_side_name" TEXT NOT NULL DEFAULT 'West',
ADD COLUMN     "right_side_name" TEXT NOT NULL DEFAULT 'East';

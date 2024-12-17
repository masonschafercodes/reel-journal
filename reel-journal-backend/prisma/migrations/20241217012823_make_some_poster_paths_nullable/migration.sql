-- AlterTable
ALTER TABLE "Crew" ALTER COLUMN "profile_path" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "still" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "poster" DROP NOT NULL;

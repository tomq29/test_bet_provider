-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'first_team_won', 'second_team_won');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

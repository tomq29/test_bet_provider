-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'won', 'lost');

-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "eventID" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "potentialWin" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - Added the required column `difficulty` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;

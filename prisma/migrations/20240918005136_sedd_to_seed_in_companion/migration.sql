/*
  Warnings:

  - You are about to drop the column `sedd` on the `Companion` table. All the data in the column will be lost.
  - Added the required column `seed` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companion" DROP COLUMN "sedd",
ADD COLUMN     "seed" TEXT NOT NULL;

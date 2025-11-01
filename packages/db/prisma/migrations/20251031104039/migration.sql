/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Shape` table. All the data in the column will be lost.
  - Added the required column `shape` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "coordinates",
ADD COLUMN     "shape" TEXT NOT NULL;

/*
  Warnings:

  - Made the column `unit_price` on table `Med` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Med" ALTER COLUMN "unit_price" SET NOT NULL;

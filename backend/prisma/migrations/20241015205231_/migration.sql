/*
  Warnings:

  - Added the required column `consumed` to the `Med_consuption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Med_consuption" ADD COLUMN     "consumed" INTEGER NOT NULL;

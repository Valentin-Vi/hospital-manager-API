/*
  Warnings:

  - You are about to drop the column `lastRestockDate` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `nextRestockDate` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "lastRestockDate",
DROP COLUMN "nextRestockDate";

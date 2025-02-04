/*
  Warnings:

  - You are about to drop the column `item_id` on the `ItemStockMonthlySnapshot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemStockMonthlySnapshot" DROP CONSTRAINT "ItemStockMonthlySnapshot_item_id_fkey";

-- AlterTable
ALTER TABLE "ItemStockMonthlySnapshot" DROP COLUMN "item_id";

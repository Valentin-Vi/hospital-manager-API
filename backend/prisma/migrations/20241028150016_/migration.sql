/*
  Warnings:

  - A unique constraint covering the columns `[item_id]` on the table `ItemStock` will be added. If there are existing duplicate values, this will fail.
  - Made the column `item_id` on table `ItemStock` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `financialMOnthlySnapshot_id` to the `ItemStockMonthlySnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialReport_id` to the `MedMonthlySnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_stock_id_fkey";

-- DropIndex
DROP INDEX "Item_stock_id_key";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "monthlySnapshot_id" DROP NOT NULL,
ALTER COLUMN "stockChange_id" DROP NOT NULL,
ALTER COLUMN "stock_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemStock" ALTER COLUMN "item_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "ItemStockMonthlySnapshot" ADD COLUMN     "financialMOnthlySnapshot_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedMonthlySnapshot" ADD COLUMN     "financialReport_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "FinancialMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "itemStockMonthlySnapshot_id" INTEGER NOT NULL,
    "medMonthlySnapshot_id" INTEGER NOT NULL,
    "total_inflow" DECIMAL(65,30) NOT NULL,
    "total_outflow" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_itemStockMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("itemStockMonthlySnapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_medMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("medMonthlySnapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_item_id_key" ON "ItemStock"("item_id");

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMonthlySnapshot" ADD CONSTRAINT "FinancialMonthlySnapshot_itemStockMonthlySnapshot_id_fkey" FOREIGN KEY ("itemStockMonthlySnapshot_id") REFERENCES "ItemStockMonthlySnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMonthlySnapshot" ADD CONSTRAINT "FinancialMonthlySnapshot_medMonthlySnapshot_id_fkey" FOREIGN KEY ("medMonthlySnapshot_id") REFERENCES "MedMonthlySnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `total_inflow` on the `FinancialMonthlySnapshot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `total_outflow` on the `FinancialMonthlySnapshot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `unit_price` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `cost` on the `ItemStockMonthlySnapshot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `unit_price` on the `Med` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `cost` on the `MedMonthlySnapshot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `cost` on the `MedStockChange` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "FinancialMonthlySnapshot" ALTER COLUMN "total_inflow" SET DATA TYPE INTEGER,
ALTER COLUMN "total_outflow" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "unit_price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ItemStockMonthlySnapshot" ALTER COLUMN "cost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Med" ALTER COLUMN "unit_price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MedMonthlySnapshot" ALTER COLUMN "cost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MedStockChange" ALTER COLUMN "cost" SET DATA TYPE INTEGER;

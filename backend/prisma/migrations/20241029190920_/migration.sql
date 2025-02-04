-- AlterTable
ALTER TABLE "ItemStockMonthlySnapshot" ALTER COLUMN "financialMOnthlySnapshot_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedMonthlySnapshot" ALTER COLUMN "financialReport_id" DROP NOT NULL;

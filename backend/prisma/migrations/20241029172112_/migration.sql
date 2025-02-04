-- DropForeignKey
ALTER TABLE "Med" DROP CONSTRAINT "Med_stock_id_fkey";

-- AlterTable
ALTER TABLE "Med" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "monthlySnapshot_id" DROP NOT NULL,
ALTER COLUMN "stockChange_id" DROP NOT NULL,
ALTER COLUMN "stock_id" DROP NOT NULL,
ALTER COLUMN "unit_price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Med" ADD CONSTRAINT "Med_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "MedStock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[med_id]` on the table `MedStock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Med" DROP CONSTRAINT "Med_stock_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "MedStock_med_id_key" ON "MedStock"("med_id");

-- AddForeignKey
ALTER TABLE "MedStock" ADD CONSTRAINT "MedStock_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE SET NULL ON UPDATE CASCADE;

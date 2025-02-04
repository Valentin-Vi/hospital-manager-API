/*
  Warnings:

  - You are about to drop the `MedStockChange` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedStockChange" DROP CONSTRAINT "MedStockChange_med_id_fkey";

-- DropTable
DROP TABLE "MedStockChange";

-- CreateTable
CREATE TABLE "MedStockChanges" (
    "id" SERIAL NOT NULL,
    "previous_quantity" INTEGER NOT NULL,
    "new_quantity" INTEGER NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "med_id" INTEGER NOT NULL,

    CONSTRAINT "MedStockChanges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedStockChanges_id_key" ON "MedStockChanges"("id");

-- AddForeignKey
ALTER TABLE "MedStockChanges" ADD CONSTRAINT "MedStockChanges_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE CASCADE ON UPDATE CASCADE;

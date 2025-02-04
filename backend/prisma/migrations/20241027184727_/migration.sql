/*
  Warnings:

  - You are about to drop the column `units` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `Med` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stock_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stock_id]` on the table `Med` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monthlySnapshot_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockChange_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlySnapshot_id` to the `Med` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockChange_id` to the `Med` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `Med` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Med` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "units",
ADD COLUMN     "monthlySnapshot_id" INTEGER NOT NULL,
ADD COLUMN     "stockChange_id" INTEGER NOT NULL,
ADD COLUMN     "stock_id" INTEGER NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Med" DROP COLUMN "units",
ADD COLUMN     "monthlySnapshot_id" INTEGER NOT NULL,
ADD COLUMN     "stockChange_id" INTEGER NOT NULL,
ADD COLUMN     "stock_id" INTEGER NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "VisitMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "total_visits" INTEGER NOT NULL,
    "canceled_visits" INTEGER NOT NULL,

    CONSTRAINT "VisitMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStock" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStockChanges" (
    "id" SERIAL NOT NULL,
    "previous_quantity" INTEGER NOT NULL,
    "new_quantity" INTEGER NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "ItemStockChanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStockMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "inflow" INTEGER NOT NULL,
    "outflow" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "end_quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemStockMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedStock" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "MedStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedStockChange" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER NOT NULL,
    "inflow" INTEGER NOT NULL,
    "outflow" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "end_quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedStockChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER NOT NULL,
    "inflow" INTEGER NOT NULL,
    "outflow" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "end_quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitMonthlySnapshot_id_key" ON "VisitMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_id_key" ON "ItemStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStockChanges_id_key" ON "ItemStockChanges"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStockMonthlySnapshot_id_key" ON "ItemStockMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedStock_id_key" ON "MedStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedStockChange_id_key" ON "MedStockChange"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedMonthlySnapshot_id_key" ON "MedMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_stock_id_key" ON "Item"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "Med_stock_id_key" ON "Med"("stock_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "ItemStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStockChanges" ADD CONSTRAINT "ItemStockChanges_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStockMonthlySnapshot" ADD CONSTRAINT "ItemStockMonthlySnapshot_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedStockChange" ADD CONSTRAINT "MedStockChange_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedMonthlySnapshot" ADD CONSTRAINT "MedMonthlySnapshot_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Med" ADD CONSTRAINT "Med_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "MedStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

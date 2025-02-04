/*
  Warnings:

  - You are about to drop the column `units` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `Med` table. All the data in the column will be lost.
  - The primary key for the `TurnoTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `refreshToken_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Med` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stock_id]` on the table `Med` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TurnoTime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctor_id` to the `HistMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Med` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Desk" DROP CONSTRAINT "Desk_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- DropIndex
DROP INDEX "RefreshToken_id_key";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "HistMedico" ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "units",
ADD COLUMN     "stockChange_id" INTEGER,
ADD COLUMN     "stock_id" INTEGER,
ADD COLUMN     "unit_price" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Med" DROP COLUMN "units",
ADD COLUMN     "monthlySnapshot_id" INTEGER,
ADD COLUMN     "stockChange_id" INTEGER,
ADD COLUMN     "stock_id" INTEGER,
ADD COLUMN     "unit_price" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "turno_id" DROP NOT NULL,
ALTER COLUMN "turno_id" DROP DEFAULT,
ADD CONSTRAINT "TurnoTime_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TurnoTime_turno_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken_id",
ALTER COLUMN "type" DROP NOT NULL;

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
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "itemStockMonthlySnapshot_id" INTEGER NOT NULL,
    "medMonthlySnapshot_id" INTEGER NOT NULL,
    "total_inflow" INTEGER NOT NULL,
    "total_outflow" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialMonthlySnapshot_pkey" PRIMARY KEY ("id")
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
    "inflow" INTEGER NOT NULL,
    "outflow" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "end_quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "financialMOnthlySnapshot_id" INTEGER,

    CONSTRAINT "ItemStockMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedMonthlySnapshot" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER NOT NULL,
    "inflow" INTEGER NOT NULL,
    "outflow" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "end_quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "financialReport_id" INTEGER,

    CONSTRAINT "MedMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedStockChanges" (
    "id" SERIAL NOT NULL,
    "previous_quantity" INTEGER NOT NULL,
    "new_quantity" INTEGER NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "med_id" INTEGER NOT NULL,

    CONSTRAINT "MedStockChanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedStock" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER,
    "quantity" INTEGER,

    CONSTRAINT "MedStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitMonthlySnapshot_id_key" ON "VisitMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_id_key" ON "ItemStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_item_id_key" ON "ItemStock"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_itemStockMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("itemStockMonthlySnapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialMonthlySnapshot_medMonthlySnapshot_id_key" ON "FinancialMonthlySnapshot"("medMonthlySnapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStockChanges_id_key" ON "ItemStockChanges"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStockMonthlySnapshot_id_key" ON "ItemStockMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedMonthlySnapshot_id_key" ON "MedMonthlySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedStockChanges_id_key" ON "MedStockChanges"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedStock_id_key" ON "MedStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MedStock_med_id_key" ON "MedStock"("med_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Med_name_key" ON "Med"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Med_stock_id_key" ON "Med"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_id_key" ON "TurnoTime"("id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desk" ADD CONSTRAINT "Desk_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistMedico" ADD CONSTRAINT "HistMedico_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMonthlySnapshot" ADD CONSTRAINT "FinancialMonthlySnapshot_itemStockMonthlySnapshot_id_fkey" FOREIGN KEY ("itemStockMonthlySnapshot_id") REFERENCES "ItemStockMonthlySnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMonthlySnapshot" ADD CONSTRAINT "FinancialMonthlySnapshot_medMonthlySnapshot_id_fkey" FOREIGN KEY ("medMonthlySnapshot_id") REFERENCES "MedMonthlySnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStockChanges" ADD CONSTRAINT "ItemStockChanges_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedMonthlySnapshot" ADD CONSTRAINT "MedMonthlySnapshot_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedStockChanges" ADD CONSTRAINT "MedStockChanges_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedStock" ADD CONSTRAINT "MedStock_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Desk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancialMonthlySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistMedico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory_consuption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemStockChanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemStockMonthlySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Med` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedMonthlySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedStockChanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Med_consuption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Turno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TurnoTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitMonthlySnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "userType" AS ENUM ('CLIENT', 'DOCTOR', 'DESK');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Desk" DROP CONSTRAINT "Desk_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Desk" DROP CONSTRAINT "Desk_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FinancialMonthlySnapshot" DROP CONSTRAINT "FinancialMonthlySnapshot_itemStockMonthlySnapshot_id_fkey";

-- DropForeignKey
ALTER TABLE "FinancialMonthlySnapshot" DROP CONSTRAINT "FinancialMonthlySnapshot_medMonthlySnapshot_id_fkey";

-- DropForeignKey
ALTER TABLE "HistMedico" DROP CONSTRAINT "HistMedico_client_id_fkey";

-- DropForeignKey
ALTER TABLE "HistMedico" DROP CONSTRAINT "HistMedico_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory_consuption" DROP CONSTRAINT "Inventory_consuption_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemStock" DROP CONSTRAINT "ItemStock_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemStockChanges" DROP CONSTRAINT "ItemStockChanges_item_id_fkey";

-- DropForeignKey
ALTER TABLE "MedMonthlySnapshot" DROP CONSTRAINT "MedMonthlySnapshot_med_id_fkey";

-- DropForeignKey
ALTER TABLE "MedStock" DROP CONSTRAINT "MedStock_med_id_fkey";

-- DropForeignKey
ALTER TABLE "MedStockChanges" DROP CONSTRAINT "MedStockChanges_med_id_fkey";

-- DropForeignKey
ALTER TABLE "Med_consuption" DROP CONSTRAINT "Med_consuption_med_id_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Desk";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "FinancialMonthlySnapshot";

-- DropTable
DROP TABLE "HistMedico";

-- DropTable
DROP TABLE "Inventory_consuption";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "ItemStock";

-- DropTable
DROP TABLE "ItemStockChanges";

-- DropTable
DROP TABLE "ItemStockMonthlySnapshot";

-- DropTable
DROP TABLE "Med";

-- DropTable
DROP TABLE "MedMonthlySnapshot";

-- DropTable
DROP TABLE "MedStock";

-- DropTable
DROP TABLE "MedStockChanges";

-- DropTable
DROP TABLE "Med_consuption";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "Turno";

-- DropTable
DROP TABLE "TurnoTime";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VisitMonthlySnapshot";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "lastname" TEXT,
    "refreshToken" TEXT,
    "type" "userType" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "clients" (
    "clientId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctorId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "desk" (
    "deskId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "desk_pkey" PRIMARY KEY ("deskId")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "visitDate" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientId_key" ON "clients"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_userId_key" ON "clients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_doctorId_key" ON "doctors"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userId_key" ON "doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "desk_deskId_key" ON "desk"("deskId");

-- CreateIndex
CREATE UNIQUE INDEX "desk_userId_key" ON "desk"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "visits_id_key" ON "visits"("id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desk" ADD CONSTRAINT "desk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

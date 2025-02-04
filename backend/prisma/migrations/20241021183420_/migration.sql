/*
  Warnings:

  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `turoDate_id` on the `Turno` table. All the data in the column will be lost.
  - You are about to drop the `TurnoDate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Turno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TurnoTime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[turno_id]` on the table `TurnoTime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date]` on the table `TurnoTime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `TurnoTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno_id` to the `TurnoTime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_turnoTime_id_fkey";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_turoDate_id_fkey";

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "turoDate_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TurnoTime" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "turno_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TurnoDate";

-- CreateIndex
CREATE UNIQUE INDEX "Turno_id_key" ON "Turno"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_id_key" ON "TurnoTime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_turno_id_key" ON "TurnoTime"("turno_id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_date_key" ON "TurnoTime"("date");

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

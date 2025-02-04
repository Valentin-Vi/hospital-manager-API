/*
  Warnings:

  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `turno_id` on the `Turno` table. All the data in the column will be lost.
  - The primary key for the `TurnoDate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `turno_date_id` on the `TurnoDate` table. All the data in the column will be lost.
  - You are about to drop the column `turno_id` on the `TurnoDate` table. All the data in the column will be lost.
  - The primary key for the `TurnoTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `turno_id` on the `TurnoTime` table. All the data in the column will be lost.
  - You are about to drop the column `turno_time_id` on the `TurnoTime` table. All the data in the column will be lost.
  - Added the required column `turnoDate_id` to the `Turno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnoTime_id` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TurnoDate" DROP CONSTRAINT "TurnoDate_turno_id_fkey";

-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- DropIndex
DROP INDEX "TurnoDate_turno_id_key";

-- DropIndex
DROP INDEX "TurnoTime_turno_id_key";

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "turno_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "turnoDate_id" INTEGER NOT NULL,
ADD COLUMN     "turnoTime_id" INTEGER NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TurnoDate" DROP CONSTRAINT "TurnoDate_pkey",
DROP COLUMN "turno_date_id",
DROP COLUMN "turno_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TurnoDate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_pkey",
DROP COLUMN "turno_id",
DROP COLUMN "turno_time_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TurnoTime_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_turnoDate_id_fkey" FOREIGN KEY ("turnoDate_id") REFERENCES "TurnoDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_turnoTime_id_fkey" FOREIGN KEY ("turnoTime_id") REFERENCES "TurnoTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

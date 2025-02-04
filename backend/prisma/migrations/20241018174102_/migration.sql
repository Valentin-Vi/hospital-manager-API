/*
  Warnings:

  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Turno` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Turno` table. All the data in the column will be lost.
  - You are about to drop the column `turn_id` on the `Turno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Turno_date_time_key";

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "date",
DROP COLUMN "time",
DROP COLUMN "turn_id",
ADD COLUMN     "turno_id" SERIAL NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("turno_id");

-- CreateTable
CREATE TABLE "TurnoDate" (
    "turno_date_id" SERIAL NOT NULL,
    "turno_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TurnoDate_pkey" PRIMARY KEY ("turno_date_id")
);

-- CreateTable
CREATE TABLE "TurnoTime" (
    "turno_time_id" SERIAL NOT NULL,
    "turno_id" INTEGER NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "TurnoTime_pkey" PRIMARY KEY ("turno_time_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TurnoDate_turno_id_key" ON "TurnoDate"("turno_id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_turno_id_key" ON "TurnoTime"("turno_id");

-- AddForeignKey
ALTER TABLE "TurnoDate" ADD CONSTRAINT "TurnoDate_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("turno_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("turno_id") ON DELETE RESTRICT ON UPDATE CASCADE;

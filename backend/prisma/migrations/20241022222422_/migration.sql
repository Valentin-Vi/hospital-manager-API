/*
  Warnings:

  - Added the required column `turnoTime_id` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- AlterTable
ALTER TABLE "Turno" ADD COLUMN     "turnoTime_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

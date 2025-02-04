/*
  Warnings:

  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Turno` table. All the data in the column will be lost.
  - You are about to drop the column `turnoDate_id` on the `Turno` table. All the data in the column will be lost.
  - Added the required column `turoDate_id` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_turnoDate_id_fkey";

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "id",
DROP COLUMN "turnoDate_id",
ADD COLUMN     "turoDate_id" INTEGER NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("user_id", "turoDate_id", "turnoTime_id");

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_turoDate_id_fkey" FOREIGN KEY ("turoDate_id") REFERENCES "TurnoDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `TurnoTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `TurnoTime` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- AlterTable
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "turno_id" DROP NOT NULL,
ALTER COLUMN "turno_id" DROP DEFAULT,
ADD CONSTRAINT "TurnoTime_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "turnotime_turno_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "TurnoTime_id_key" ON "TurnoTime"("id");

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

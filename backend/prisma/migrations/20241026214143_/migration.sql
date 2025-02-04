/*
  Warnings:

  - The primary key for the `TurnoTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TurnoTime` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TurnoTime_id_key";

-- AlterTable
CREATE SEQUENCE turnotime_turno_id_seq;
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_pkey",
DROP COLUMN "id",
ALTER COLUMN "turno_id" SET DEFAULT nextval('turnotime_turno_id_seq'),
ADD CONSTRAINT "TurnoTime_pkey" PRIMARY KEY ("turno_id");
ALTER SEQUENCE turnotime_turno_id_seq OWNED BY "TurnoTime"."turno_id";

/*
  Warnings:

  - You are about to drop the column `turnoCancelado_id` on the `Turno` table. All the data in the column will be lost.
  - You are about to drop the `TurnoCancelado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TurnoCancelado" DROP CONSTRAINT "TurnoCancelado_turno_id_fkey";

-- AlterTable
ALTER TABLE "Turno" DROP COLUMN "turnoCancelado_id",
ADD COLUMN     "cancelation_date" TIMESTAMP(3);

-- DropTable
DROP TABLE "TurnoCancelado";

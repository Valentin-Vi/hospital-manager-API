/*
  Warnings:

  - Added the required column `doctor_id` to the `HistMedico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistMedico" ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HistMedico" ADD CONSTRAINT "HistMedico_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

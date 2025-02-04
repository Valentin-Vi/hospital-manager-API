-- DropForeignKey
ALTER TABLE "TurnoTime" DROP CONSTRAINT "TurnoTime_turno_id_fkey";

-- AddForeignKey
ALTER TABLE "TurnoTime" ADD CONSTRAINT "TurnoTime_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

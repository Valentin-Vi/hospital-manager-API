/*
  Warnings:

  - A unique constraint covering the columns `[date,time]` on the table `Turno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Turno_date_time_key" ON "Turno"("date", "time");

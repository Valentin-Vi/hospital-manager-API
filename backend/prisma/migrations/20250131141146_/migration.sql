/*
  Warnings:

  - The primary key for the `visits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `visits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitId]` on the table `visits` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "visits_id_key";

-- AlterTable
ALTER TABLE "visits" DROP CONSTRAINT "visits_pkey",
DROP COLUMN "id",
ADD COLUMN     "visitId" SERIAL NOT NULL,
ADD CONSTRAINT "visits_pkey" PRIMARY KEY ("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "visits_visitId_key" ON "visits"("visitId");

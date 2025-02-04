/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[refresh_id]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refresh_id` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RefreshToken_refresh_token_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
ADD COLUMN     "refresh_id" INTEGER NOT NULL,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("refresh_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_refresh_id_key" ON "RefreshToken"("refresh_id");

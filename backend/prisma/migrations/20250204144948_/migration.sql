/*
  Warnings:

  - You are about to drop the `desk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "desk" DROP CONSTRAINT "desk_userId_fkey";

-- DropTable
DROP TABLE "desk";

-- CreateTable
CREATE TABLE "desks" (
    "deskId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "desks_pkey" PRIMARY KEY ("deskId")
);

-- CreateTable
CREATE TABLE "medications" (
    "medId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("medId")
);

-- CreateTable
CREATE TABLE "items" (
    "itemId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "stock" (
    "stockId" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "medId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateTable
CREATE TABLE "stock_history" (
    "histId" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "units" INTEGER NOT NULL,

    CONSTRAINT "stock_history_pkey" PRIMARY KEY ("histId")
);

-- CreateIndex
CREATE UNIQUE INDEX "desks_deskId_key" ON "desks"("deskId");

-- CreateIndex
CREATE UNIQUE INDEX "desks_userId_key" ON "desks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "medications_medId_key" ON "medications"("medId");

-- CreateIndex
CREATE UNIQUE INDEX "items_itemId_key" ON "items"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_stockId_key" ON "stock"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_itemId_key" ON "stock"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_medId_key" ON "stock"("medId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_history_histId_key" ON "stock_history"("histId");

-- AddForeignKey
ALTER TABLE "desks" ADD CONSTRAINT "desks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_medId_fkey" FOREIGN KEY ("medId") REFERENCES "medications"("medId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("stockId") ON DELETE RESTRICT ON UPDATE CASCADE;

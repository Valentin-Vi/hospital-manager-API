/*
  Warnings:

  - A unique constraint covering the columns `[hist_id]` on the table `HistMedico` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Inventory_consuption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[med_id]` on the table `Med` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Med_consuption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HistMedico_hist_id_key" ON "HistMedico"("hist_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_consuption_id_key" ON "Inventory_consuption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Med_med_id_key" ON "Med"("med_id");

-- CreateIndex
CREATE UNIQUE INDEX "Med_consuption_id_key" ON "Med_consuption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

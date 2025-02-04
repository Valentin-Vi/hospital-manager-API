-- DropForeignKey
ALTER TABLE "Inventory_consuption" DROP CONSTRAINT "Inventory_consuption_item_id_fkey";

-- AddForeignKey
ALTER TABLE "Inventory_consuption" ADD CONSTRAINT "Inventory_consuption_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

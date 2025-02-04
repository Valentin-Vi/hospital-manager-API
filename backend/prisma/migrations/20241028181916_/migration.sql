-- DropForeignKey
ALTER TABLE "ItemStock" DROP CONSTRAINT "ItemStock_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemStockChanges" DROP CONSTRAINT "ItemStockChanges_item_id_fkey";

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStockChanges" ADD CONSTRAINT "ItemStockChanges_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

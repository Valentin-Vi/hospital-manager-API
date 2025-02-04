-- CreateTable
CREATE TABLE "Item" (
    "item_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "lastRestockDate" TIMESTAMP(3) NOT NULL,
    "nextRestockDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Inventory_consuption" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "date_of_consumption" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_consuption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_consuption_item_id_key" ON "Inventory_consuption"("item_id");

-- AddForeignKey
ALTER TABLE "Inventory_consuption" ADD CONSTRAINT "Inventory_consuption_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

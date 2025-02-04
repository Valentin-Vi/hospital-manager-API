-- CreateTable
CREATE TABLE "Med" (
    "med_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Med_pkey" PRIMARY KEY ("med_id")
);

-- CreateTable
CREATE TABLE "Med_consuption" (
    "id" SERIAL NOT NULL,
    "med_id" INTEGER NOT NULL,
    "date_of_consumption" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Med_consuption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Med_consuption_med_id_key" ON "Med_consuption"("med_id");

-- AddForeignKey
ALTER TABLE "Med_consuption" ADD CONSTRAINT "Med_consuption_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "Med"("med_id") ON DELETE RESTRICT ON UPDATE CASCADE;

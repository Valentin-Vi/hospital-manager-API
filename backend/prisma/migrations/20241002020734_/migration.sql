-- CreateTable
CREATE TABLE "HistMedico" (
    "hist_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "HistMedico_pkey" PRIMARY KEY ("hist_id")
);

-- AddForeignKey
ALTER TABLE "HistMedico" ADD CONSTRAINT "HistMedico_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Turno" (
    "turn_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("turn_id")
);

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

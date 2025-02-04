-- CreateTable
CREATE TABLE "TurnoCancelado" (
    "id" SERIAL NOT NULL,
    "turno_id" INTEGER NOT NULL,
    "cancelation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TurnoCancelado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TurnoCancelado_id_key" ON "TurnoCancelado"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TurnoCancelado_turno_id_key" ON "TurnoCancelado"("turno_id");

-- AddForeignKey
ALTER TABLE "TurnoCancelado" ADD CONSTRAINT "TurnoCancelado_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

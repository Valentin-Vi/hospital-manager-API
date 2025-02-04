-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_department_id_fkey";

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
CREATE SEQUENCE refreshtoken_refresh_id_seq;
ALTER TABLE "RefreshToken" ALTER COLUMN "refresh_id" SET DEFAULT nextval('refreshtoken_refresh_id_seq');
ALTER SEQUENCE refreshtoken_refresh_id_seq OWNED BY "RefreshToken"."refresh_id";

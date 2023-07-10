-- AlterTable
ALTER TABLE "recursos_users" ADD COLUMN     "conteudo" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "recursoId" SET DEFAULT 'null';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "siteUrl" DROP DEFAULT;

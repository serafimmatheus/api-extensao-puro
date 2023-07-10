/*
  Warnings:

  - The primary key for the `recursos_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `recursos_users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "recursos_users" DROP CONSTRAINT "recursos_users_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "recursoId" DROP DEFAULT,
ALTER COLUMN "conteudo" DROP DEFAULT,
ADD CONSTRAINT "recursos_users_pkey" PRIMARY KEY ("id", "recursoId", "userId");

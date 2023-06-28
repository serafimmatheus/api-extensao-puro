/*
  Warnings:

  - You are about to drop the column `userId` on the `recursos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recursos" DROP CONSTRAINT "recursos_userId_fkey";

-- AlterTable
ALTER TABLE "recursos" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "recursos_users" (
    "recursoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "recursos_users_pkey" PRIMARY KEY ("recursoId","userId")
);

-- AddForeignKey
ALTER TABLE "recursos_users" ADD CONSTRAINT "recursos_users_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "recursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recursos_users" ADD CONSTRAINT "recursos_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

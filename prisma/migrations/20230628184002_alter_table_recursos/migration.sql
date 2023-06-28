/*
  Warnings:

  - You are about to drop the column `recursosId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `recursos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_recursosId_fkey";

-- AlterTable
ALTER TABLE "recursos" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "recursosId";

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

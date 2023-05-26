/*
  Warnings:

  - A unique constraint covering the columns `[chaveApi]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chaveApi` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "chaveApi" TEXT NOT NULL,
ADD COLUMN     "isAcive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAdm" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "users_chaveApi_key" ON "users"("chaveApi");

/*
  Warnings:

  - You are about to drop the column `isAcive` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isAcive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

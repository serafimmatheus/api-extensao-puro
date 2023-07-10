/*
  Warnings:

  - The primary key for the `recursos_users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "recursos_users" DROP CONSTRAINT "recursos_users_pkey",
ADD CONSTRAINT "recursos_users_pkey" PRIMARY KEY ("id");

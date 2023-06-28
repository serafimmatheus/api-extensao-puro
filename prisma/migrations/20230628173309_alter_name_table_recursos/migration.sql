/*
  Warnings:

  - You are about to drop the `Recursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_recursosId_fkey";

-- DropTable
DROP TABLE "Recursos";

-- CreateTable
CREATE TABLE "recursos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_recursosId_fkey" FOREIGN KEY ("recursosId") REFERENCES "recursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

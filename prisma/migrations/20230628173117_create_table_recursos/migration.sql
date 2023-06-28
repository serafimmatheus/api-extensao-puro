-- AlterTable
ALTER TABLE "users" ADD COLUMN     "recursosId" TEXT NOT NULL DEFAULT 'null';

-- CreateTable
CREATE TABLE "Recursos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Recursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner-topo" (
    "id" TEXT NOT NULL,

    CONSTRAINT "banner-topo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner-vantagem" (
    "id" TEXT NOT NULL,

    CONSTRAINT "banner-vantagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner-destaque-meio" (
    "id" TEXT NOT NULL,

    CONSTRAINT "banner-destaque-meio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home-saiba-mais" (
    "id" TEXT NOT NULL,

    CONSTRAINT "home-saiba-mais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner-destaque-inferior" (
    "id" TEXT NOT NULL,

    CONSTRAINT "banner-destaque-inferior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer" (
    "id" TEXT NOT NULL,

    CONSTRAINT "footer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_recursosId_fkey" FOREIGN KEY ("recursosId") REFERENCES "Recursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

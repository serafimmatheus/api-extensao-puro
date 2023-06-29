import { prisma } from "@/database/prisma";
import { Prisma, Recurso } from "@prisma/client";

export interface RecursosRepositoryIProps {
  all: () => Promise<Recurso[]>;
  create: (data: Prisma.RecursoCreateInput) => Promise<Recurso>;
  createMany: (data: Prisma.RecursoCreateInput) => Promise<Prisma.BatchPayload>;
  updated: (id: string, data: Prisma.RecursoCreateInput) => Promise<Recurso>;
  deleted: (id: string) => Promise<Recurso>;
}

class RecursosRepository implements RecursosRepositoryIProps {
  all = async () => {
    return await prisma.recurso.findMany();
  };

  create = async (data: Prisma.RecursoCreateInput) => {
    return await prisma.recurso.create({
      data,
    });
  };

  createMany = async (data: Prisma.RecursoCreateInput) => {
    return await prisma.recurso.createMany({
      data,
    });
  };

  updated = async (id: string, data: Prisma.RecursoCreateInput) => {
    return await prisma.recurso.update({
      where: {
        id,
      },
      data,
    });
  };

  deleted = async (id: string) => {
    return await prisma.recurso.delete({
      where: {
        id,
      },
    });
  };
}

export default new RecursosRepository();

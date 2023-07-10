import { prisma } from "@/database/prisma";
import { Prisma, RecursoUser } from "@prisma/client";

export interface IPropsPrismaRecursosUsersRepository {
  all: (id: string) => Promise<RecursoUser[]>;
  create: (data: Prisma.RecursoUserCreateInput) => Promise<RecursoUser>;
  updated: (
    id: string,
    data: Prisma.RecursoUserCreateInput
  ) => Promise<RecursoUser>;
  deleted: (id: string) => Promise<void>;
}

class PrismaRecursosUsersRepository
  implements IPropsPrismaRecursosUsersRepository
{
  all = async (id: string) => {
    return await prisma.recursoUser.findMany({
      where: {
        userId: id,
      },

      include: {
        user: true,
        recurso: true,
      },
    });
  };

  create = async (data: Prisma.RecursoUserCreateInput) => {
    return await prisma.recursoUser.create({
      data,
    });
  };

  updated = async (id: string, data: Prisma.RecursoUserCreateInput) => {
    return await prisma.recursoUser.update({
      where: {
        id,
      },
      data,
    });
  };
  deleted = async (id: string) => {
    await prisma.recursoUser.delete({
      where: {
        id,
      },
    });
  };
}

export default new PrismaRecursosUsersRepository();

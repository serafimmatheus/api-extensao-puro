import { prisma } from "@/database/prisma";
import { Prisma, RecursoUser } from "@prisma/client";

export interface IPropsPrismaRecursosUsersRepository {
  all: (id: string) => Promise<RecursoUser[]>;
  create: (data: Prisma.RecursoUserCreateInput) => Promise<RecursoUser>;
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
}

export default new PrismaRecursosUsersRepository();

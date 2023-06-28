import { prisma } from "@/database/prisma";
import { RecursoUser } from "@prisma/client";

export interface IPropsPrismaRecursosUsersRepository {
  all: () => Promise<RecursoUser[]>;
}

class PrismaRecursosUsersRepository
  implements IPropsPrismaRecursosUsersRepository
{
  all = async () => {
    return await prisma.recursoUser.findMany();
  };
}

export default new PrismaRecursosUsersRepository();

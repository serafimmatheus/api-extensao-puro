import { prisma } from "@/database/prisma";
import { Prisma, User } from "@prisma/client";

export interface UsersRepositoryProps {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  allUsers: () => Promise<User[]>;
  findOneForEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<User>;
  findOneUser: (id: string) => Promise<User | null>;
  updated: (data: Prisma.UserCreateInput, id: string) => Promise<User>;
}

class PrismaUserRepository implements UsersRepositoryProps {
  allUsers = async () => {
    return await prisma.user.findMany({
      include: {
        checkIns: true,
      },
    });
  };

  findOneForEmail = async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  findOneUser = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  };

  create = async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  };

  updated = async (data: Prisma.UserCreateInput, id: string) => {
    const user = await prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return user;
  };

  delete = async (id: string) => {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  };
}

export default new PrismaUserRepository();
import { IPropsPrismaRecursosUsersRepository } from "@/repositories/prisma-recursosAndUsers-repository";
import { Prisma } from "@prisma/client";

export class RecursosUsersServices {
  constructor(
    private recursosUsersRepository: IPropsPrismaRecursosUsersRepository
  ) {}
  all = async (id: string) => {
    const recursosUsers = await this.recursosUsersRepository.all(id);

    return recursosUsers;
  };

  create = async (data: any) => {
    return await this.recursosUsersRepository.create(data);
  };

  updated = async (id: string, data: any) => {
    return await this.recursosUsersRepository.updated(id, data);
  };

  deleted = async (id: string) => {
    return await this.recursosUsersRepository.deleted(id);
  };
}

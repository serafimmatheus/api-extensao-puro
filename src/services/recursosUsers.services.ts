import { IPropsPrismaRecursosUsersRepository } from "@/repositories/prisma-recursosAndUsers-repository";

export class RecursosUsersServices {
  constructor(
    private recursosUsersRepository: IPropsPrismaRecursosUsersRepository
  ) {}
  all = async () => {
    const recursosUsers = await this.recursosUsersRepository.all();

    return recursosUsers;
  };
}

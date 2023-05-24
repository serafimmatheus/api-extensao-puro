import { prismaUsersRepository } from "@/repositories";
import { UsersServices } from "@/services/users.services";

export const makeRegisterUseCase = () => {
  const usersServices = new UsersServices(prismaUsersRepository);
  return usersServices;
};

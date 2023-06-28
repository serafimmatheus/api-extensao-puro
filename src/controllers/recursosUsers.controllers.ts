import prismaRecursosAndUsersRepository from "@/repositories/prisma-recursosAndUsers-repository";
import { RecursosUsersServices } from "@/services/recursosUsers.services";
import { FastifyReply, FastifyRequest } from "fastify";

const recursosUsersServices = new RecursosUsersServices(
  prismaRecursosAndUsersRepository
);

class RecursosUsersControllers {
  all = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const userRecursos = await recursosUsersServices.all();
      return res.status(200).send(userRecursos);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new RecursosUsersControllers();

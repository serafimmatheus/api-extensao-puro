import { env } from "@/env";
import { MyError } from "@/errors/myError";
import { makeRegisterUseCase } from "@/factories/make-register-use-case";
import { prismaUsersRepository } from "@/repositories";
import { UsersServices } from "@/services/users.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const usersServices = new UsersServices(prismaUsersRepository);

class UsersControllers {
  login = async (req: FastifyRequest, res: FastifyReply) => {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = loginSchema.parse(req.body);

    try {
      const makeUsersServices = makeRegisterUseCase();
      const user = await makeUsersServices.login({ email, password });
      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  findAll = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const users = await usersServices.findAll();

      return res.send(users);
    } catch (error) {
      return res.send([]);
    }
  };

  findOneUser = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params;

    try {
      const user = await usersServices.findOneUser(id);
      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const registerBodySchema = z.object({
      name: z.string().min(1).max(30),
      email: z.string().email(),
      password: z.string().min(6).max(30),
      chaveApi: z.string(),
      isActive: z.boolean().default(false),
      isAdm: z.boolean().default(false),
    });

    const { email, name, password, chaveApi, isActive, isAdm } =
      registerBodySchema.parse(req.body);

    try {
      await usersServices.create({
        email,
        name,
        password,
        chaveApi,
        isActive,
        isAdm,
      });
      return res.status(201).send();
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
      return res.status(500).send({ message: "Internal server error." });
    }
  };

  updated = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params;

    const updateBodySchema = z.object({
      name: z.string().min(1).max(30),
      email: z.string().email(),
      password: z.string().min(6).max(30),
    });

    const { name, email, password } = updateBodySchema.parse(req.body);

    try {
      const userUpdated = await usersServices.updated(id, {
        name,
        email,
        password,
      });
      return res.status(201).send(userUpdated);
    } catch (error) {
      return res.status(404).send({ message: "User not found" });
    }
  };

  delete = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params;

    try {
      await usersServices.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  };
}

export default new UsersControllers();

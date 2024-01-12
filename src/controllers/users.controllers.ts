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

      const token = await res.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
            expiresIn: "1d",
          },
        }
      );

      const newUser = {
        ...user,
        password_hash: undefined,
        created_at: undefined,
        id: undefined,
      };

      return res.status(200).send({ token, user: newUser });
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  me = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const user = await usersServices.me(req.user.sub);
      return res.status(200).send({ ...user, password_hash: undefined });
    } catch (error) {
      return res.status(400).send();
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
    const schemaBody = z.object({
      id: z.string(),
    });
    const { id } = schemaBody.parse(req.params);

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
      siteUrl: z.string(),
    });

    const { email, name, password, chaveApi, siteUrl } =
      registerBodySchema.parse(req.body);

    try {
      await usersServices.create({
        email,
        name,
        siteUrl,
        password,
        chaveApi,
        isActive: false,
        isAdm: false,
      });
      return res.status(201).send();
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
      return res.status(500).send({ message: error });
    }
  };

  updated = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaBody = z.object({
      id: z.string(),
    });
    const { id } = schemaBody.parse(req.params);

    const updateBodySchema = z.object({
      name: z.string().min(1).max(30).optional(),
      chaveApi: z.string().optional(),
      siteUrl: z.string().optional(),
    });

    const { name, chaveApi, siteUrl } = updateBodySchema.parse(req.body);

    try {
      const userUpdated = await usersServices.updated(id, {
        name,
        chaveApi,
        siteUrl,
      });
      return res.status(201).send(userUpdated);
    } catch (error) {
      return res.status(404).send({ message: "User not found" });
    }
  };

  updatedIsActive = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaBody = z.object({
      id: z.string(),
    });

    const schemaBodyActive = z.object({
      isActive: z.boolean(),
    });

    const { id } = schemaBody.parse(req.params);
    const { isActive } = schemaBodyActive.parse(req.body);

    const userAplication = req.user.sub;

    try {
      await usersServices.updatedIsActive(id, userAplication, isActive);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  delete = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaBody = z.object({
      id: z.string(),
    });
    const { id } = schemaBody.parse(req.params);

    try {
      await usersServices.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  };
}

export default new UsersControllers();

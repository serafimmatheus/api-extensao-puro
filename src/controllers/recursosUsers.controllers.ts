import { prisma } from "@/database/prisma";
import prismaRecursosAndUsersRepository from "@/repositories/prisma-recursosAndUsers-repository";
import { RecursosUsersServices } from "@/services/recursosUsers.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface IPropsDecoderToken {
  sub: string;
}

const recursosUsersServices = new RecursosUsersServices(
  prismaRecursosAndUsersRepository
);

class RecursosUsersControllers {
  all = async (req: FastifyRequest, res: FastifyReply) => {
    const token = await req.jwtVerify<IPropsDecoderToken>();

    try {
      const userRecursos = await recursosUsersServices.all(token.sub);

      return res.status(200).send(userRecursos || []);
    } catch (error) {
      console.log(error);
    }
  };

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const bodySchema = z.object({
      recursoId: z.string(),
      userId: z.string(),
      conteudo: z.string(),
    });

    const data = bodySchema.parse(req.body);

    try {
      const recursoUser = await recursosUsersServices.create(data);

      return res.status(201).send(recursoUser);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };

  updated = async (req: FastifyRequest, res: FastifyReply) => {
    const bodySchema = z.object({
      conteudo: z.string(),
    });

    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    const data = bodySchema.parse(req.body);

    try {
      await recursosUsersServices.updated(id, data);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  deleted = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    try {
      await recursosUsersServices.deleted(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

export default new RecursosUsersControllers();

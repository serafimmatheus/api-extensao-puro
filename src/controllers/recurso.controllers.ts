import recursosRepository from "@/repositories/recursos.repository";
import { RecursosServices } from "@/services/recurso.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const recursosServices = new RecursosServices(recursosRepository);

class RecursosControllers {
  all = async (req: FastifyRequest, res: FastifyReply) => {
    const allRecursos = await recursosServices.all();

    try {
      return res.status(200).send(allRecursos);
    } catch (error) {
      return res.status(400).send({
        message: "Ops, algo deu errado ao puxar a listagem de recursos",
      });
    }
  };

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const schema = z.array(
      z.object({
        name: z.string(),
      })
    );

    const validatedData = schema.parse(req.body);

    try {
      const saveRecursos = await recursosServices.create(validatedData);

      return res.status(201).send(saveRecursos);
    } catch (error) {
      return res.status(400).send({ message: "ops, algo deu errado" });
    }
  };

  createOne = async (req: FastifyRequest, res: FastifyReply) => {
    const schema = z.object({
      name: z.string(),
    });

    const data = schema.parse(req.body);

    try {
      const saveRecursos = await recursosServices.createOne(data);

      return res.status(201).send(saveRecursos);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  updated = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaBory = z.object({
      name: z.string(),
    });

    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    const data = schemaBory.parse(req.body);

    try {
      await recursosServices.updated(id, data);

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
      await recursosServices.deleted(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

export default new RecursosControllers();

import { MyError } from "@/errors/myError";
import { prismaGymRepository } from "@/repositories";
import { GymServices } from "@/services/gym.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const gymRepository = new GymServices(prismaGymRepository);

class GymControllers {
  allGyms = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const gyms = await gymRepository.allGyms();
      return res.status(200).send(gyms);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const gymSchema = z.object({
      title: z.string(),
      description: z.string().optional(),
      phone: z.string().max(11).optional(),
      latitude: z.number().max(30),
      longitude: z.number().max(30),
      checkin: z.any(),
    });

    const data = gymSchema.parse(req.body);

    try {
      const gym = await gymRepository.create(data);
      return res.status(201).send(gym);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({
          message: error.message,
        });
      }
    }
  };
}

export default new GymControllers();

import { MyError } from "@/errors/myError";
import prismaCheckinRepository from "@/repositories/prisma-checkin-repository";
import { CheckinServices } from "@/services/checkins.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const gymServices = new CheckinServices(prismaCheckinRepository);

class CheckInControllers {
  findByUserIdOnDate = async (req: FastifyRequest, res: FastifyReply) => {
    const checkinSchema = z.object({
      user_id: z.string().uuid(),
      date: z.string(),
    });

    const { user_id, date } = checkinSchema.parse(req.body);

    try {
      const checkin = await gymServices.findByUserIdOnDate(user_id, date);
      console.log(checkin);

      return res.status(201).send(checkin);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const checkinSchema = z.object({
      gym_id: z.string().uuid(),
      user_id: z.string().uuid(),
      validated_at: z.date().optional(),
    });
    const { gym_id, user_id, validated_at } = checkinSchema.parse(req.body);

    try {
      const checkin = await gymServices.create({
        gym_id,
        user_id,
        validated_at,
      });
      return res.status(201).send(checkin);
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.status).send({ message: error.message });
      }
    }
  };
}

export default new CheckInControllers();

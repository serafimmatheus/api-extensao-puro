import { prisma } from "@/database/prisma";
import { Prisma } from "@prisma/client";

export interface GymRepositoryIProps {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>;
  allGyms: () => Promise<Gym[]>;
}

class PrismaGymRepository implements GymRepositoryIProps {
  allGyms = async () => {
    const gyms = await prisma.gym.findMany();
    return gyms;
  };

  create = async (data: Prisma.GymCreateInput) => {
    const gym = await prisma.gym.create({ data });
    return gym;
  };
}

export default new PrismaGymRepository();

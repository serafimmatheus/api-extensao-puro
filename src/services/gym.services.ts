import { GymRepositoryIProps } from "@/repositories/prisma-gym-repository";
import { Prisma } from "@prisma/client";

interface DataGymIProps {
  title: string;
  description?: string | null | undefined;
  phone?: string | null | undefined;
  latitude: number;
  longitude: number;
  checkin?: string | undefined | any;
}

export class GymServices {
  constructor(private gymRepository: GymRepositoryIProps) {}

  allGyms = async () => {
    const gyms = await this.gymRepository.allGyms();
    return gyms;
  };

  create = async ({
    latitude,
    longitude,
    title,
    checkin,
    description,
    phone,
  }: DataGymIProps) => {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
      checkin,
    });

    return gym;
  };
}

import { checkinRepositoryIProps } from "@/repositories/prisma-checkin-repository";

interface CheckinsIProps {
  user_id: string;
  gym_id: string;
  validated_at?: Date | null;
}

export class CheckinServices {
  constructor(private checkinRepository: checkinRepositoryIProps) {}

  findByUserIdOnDate = async (user_id: string, date: Date) => {
    const checkIn = await this.checkinRepository.findByUserIdOnDate(
      user_id,
      date
    );
    return checkIn;
  };

  create = async ({ gym_id, user_id, validated_at = null }: CheckinsIProps) => {
    const checkin = await this.checkinRepository.create({
      gym_id,
      user_id,
      validated_at,
    });

    return checkin;
  };
}

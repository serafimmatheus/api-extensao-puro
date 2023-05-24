import { prisma } from "@/database/prisma";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

export interface checkinRepositoryIProps {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  findByUserIdOnDate: (
    user_id: string,
    date: Date
  ) => Promise<boolean[] | null>;
}

class PrismaCheckinRepository implements checkinRepositoryIProps {
  findByUserIdOnDate = async (user_id: string, date: Date) => {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const findUserForId = await prisma.checkIn.findMany({
      where: {
        user_id,
      },
    });

    const checkInOnSameDate = findUserForId.map((checkin) => {
      const checkInDate = dayjs(checkin.created_at);
      const inOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return inOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  };

  create = async (data: Prisma.CheckInUncheckedCreateInput) => {
    return await prisma.checkIn.create({
      data,
    });
  };
}

export default new PrismaCheckinRepository();

import { prisma } from "@/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

interface DecodedToken {
  sub: string;
  // outras propriedades do token, se houver
}

export async function verifyIsAdmMiddleware(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const token = await req.jwtVerify<DecodedToken>();

    const user = await prisma.user.findFirst({
      where: {
        id: token.sub,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized." });
    }

    if (!user.isAdm) {
      return res.status(401).send({ message: "Unauthorized." });
    }
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
}

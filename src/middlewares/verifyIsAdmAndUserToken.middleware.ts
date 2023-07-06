import { prisma } from "@/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface DecodedToken {
  sub: string;
  // outras propriedades do token, se houver
}

export async function verifyIsAdmAndUserTokenMiddleware(
  req: FastifyRequest,
  res: FastifyReply,
  next: any
) {
  try {
    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    const token = await req.jwtVerify<DecodedToken>();

    const user = await prisma.user.findFirst({
      where: {
        id: token.sub,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized." });
    }

    if (id === token.sub) {
      return next();
    }

    if (!user.isAdm) {
      return res.status(401).send({ message: "Unauthorized." });
    }
  } catch (error) {
    return res.status(401).send({ message: "Inserir um token válido." });
  }
}

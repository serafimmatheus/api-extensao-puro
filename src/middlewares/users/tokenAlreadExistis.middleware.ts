import { FastifyReply, FastifyRequest } from "fastify";

export const tokenAlreadyExistsMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: any
) => {
  const token = req.headers.authorization;

  console.log(token);

  next();
};

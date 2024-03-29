import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { appRoutes } from "./routes/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "fastify-content-type"],
  exposedHeaders: ["Authorization"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.SECURITY_TOKEN,
});

app.register(appRoutes);

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  } else {
    // TODO fazer integracao com um log de erro de alguma ferramenta externa qnd tiver em producao
  }

  return res.status(500).send({ message: error });
});

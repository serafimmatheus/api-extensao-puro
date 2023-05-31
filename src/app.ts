import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { appRoutes } from "./routes/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyCors, {
  origin: ["http://localhost:3000", "https://admin-puro.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
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

  return res.status(500).send({ message: "Internal server error" });
});

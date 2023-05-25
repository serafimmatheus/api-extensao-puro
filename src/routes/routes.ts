import {
  checkinControllers,
  gymControllers,
  usersControllers,
} from "@/controllers";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get("/api/v1/users", usersControllers.findAll);
  app.get("/api/v1/users/:id", usersControllers.findOneUser);
  app.get("/api/v1/me", { onRequest: [verifyJWT] }, usersControllers.me);
  app.post("/api/v1/users", usersControllers.create);
  app.post("/api/v1/users/login", usersControllers.login);
  app.patch("/api/v1/users/:id", usersControllers.updated);
  app.delete("/api/v1/users/:id", usersControllers.delete);

  app.get("/api/v1/gyms", gymControllers.allGyms);
  app.post("/api/v1/gyms", gymControllers.create);

  app.post("/api/v1/checkins", checkinControllers.create);
  app.post("/api/v1/verifyCheckins", checkinControllers.findByUserIdOnDate);
}

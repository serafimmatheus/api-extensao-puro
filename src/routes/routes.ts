import { usersControllers } from "@/controllers";
import recursosUsersControllers from "@/controllers/recursosUsers.controllers";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get("/api/v1/users", usersControllers.findAll);
  app.get("/api/v1/users/:id", usersControllers.findOneUser);
  app.get("/api/v1/me", { onRequest: [verifyJWT] }, usersControllers.me);
  app.post("/api/v1/users", usersControllers.create);
  app.post("/api/v1/users/login", usersControllers.login);
  app.patch("/api/v1/users/:id", usersControllers.updated);
  app.patch(
    "/api/v1/users/extensionActive/:id",
    { onRequest: [verifyJWT] },
    usersControllers.updatedIsActive
  );
  app.delete("/api/v1/users/:id", usersControllers.delete);

  ///// ROTAS USERS AND RECURSOS

  app.get("/api/v1/usersAndRecursos", recursosUsersControllers.all);
}

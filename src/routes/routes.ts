import { recursoControllers, usersControllers } from "@/controllers";
import recursosUsersControllers from "@/controllers/recursosUsers.controllers";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { verifyIsAdmMiddleware } from "@/middlewares/verifyIsAdm.middleware";
import { verifyIsAdmAndUserTokenMiddleware } from "@/middlewares/verifyIsAdmAndUserToken.middleware";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get(
    "/api/v1/users",
    { onRequest: [verifyJWT] },
    usersControllers.findAll
  );
  app.get(
    "/api/v1/users/:id",
    { onRequest: [verifyJWT] },
    usersControllers.findOneUser
  );
  app.get("/api/v1/me", { onRequest: [verifyJWT] }, usersControllers.me);
  app.post("/api/v1/users", usersControllers.create);
  app.post("/api/v1/users/login", usersControllers.login);
  app.put(
    "/api/v1/users/:id",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    usersControllers.updated
  );
  app.put(
    "/api/v1/users/extensionActive/:id",
    { onRequest: [verifyJWT, verifyIsAdmAndUserTokenMiddleware] },
    usersControllers.updatedIsActive
  );
  app.delete(
    "/api/v1/users/:id",
    { onRequest: [verifyJWT, verifyIsAdmAndUserTokenMiddleware] },
    usersControllers.delete
  );

  ///// ROTAS CRIACAO DE RECURSOS

  app.get(
    "/api/v1/recursos",
    { onRequest: [verifyJWT] },
    recursoControllers.all
  );

  app.post(
    "/api/v1/cadastro/recursos",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    recursoControllers.create
  );

  app.post(
    "/api/v1/cadastro/recurso",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    recursoControllers.createOne
  );

  app.put(
    "/api/v1/recurso/:id",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    recursoControllers.updated
  );

  app.delete(
    "/api/v1/recurso/:id",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    recursoControllers.deleted
  );

  ///// ROTAS USERS AND RECURSOS

  app.get("/api/v1/usersAndRecursos", recursosUsersControllers.all);
  app.post(
    "/api/v1/cadastro/recursos/users",
    { onRequest: [verifyJWT, verifyIsAdmMiddleware] },
    recursosUsersControllers.create
  );
}

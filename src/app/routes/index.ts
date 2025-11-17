import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/users/users.routes";

export default function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/user" });

  fastify.get("/", (req, rep) => {
    rep.status(200).send({
      status: "✅ Api funcionando!",
    });
  });
}

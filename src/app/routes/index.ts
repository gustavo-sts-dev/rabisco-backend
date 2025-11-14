import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authRoutes } from "./auth.routes";

export function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(authRoutes, { prefix: "/auth" });

  fastify.get("/", (req, rep) => {
    rep.status(200).send({
      status: "✅ Api funcionando!"
    })
  })
} 
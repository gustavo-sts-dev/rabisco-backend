import type { FastifyInstance, FastifyPluginOptions } from "fastify";

export function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/status", (req, rep) => {
    rep.send({
      status: "✅ Funcionando!"
    })
  });
} 
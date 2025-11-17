import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { updatePassword, updateProfile } from "./controllers/index";
import { authorized } from "@src/app/middlewares/authorization.middleware";

export function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook("preHandler", authorized);

  fastify.patch("/update-profile", updateProfile);
  fastify.put("/update-password", updatePassword);
}
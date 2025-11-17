import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { loginUser, registerUser } from "./controllers";

export function authRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
}

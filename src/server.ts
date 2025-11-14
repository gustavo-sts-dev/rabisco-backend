import fastify from "./app";
import { env } from "./configs/env.config";

const PORT = env.PORT || 5000;

fastify.listen({
  port: PORT,
  host: "0.0.0.0",
});

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";

import logger_config from "./configs/logger.config";
import cors_config from "./configs/cors.config";
import routes from "./app/routes";

const fastify = Fastify({
  logger: logger_config,
});

fastify.register(fastifyCors, cors_config);
fastify.register(fastifyHelmet)
fastify.register(routes, {
  prefix: "/v1"
});

export default fastify;

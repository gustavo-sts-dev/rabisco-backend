import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";

import logger_config from "./configs/logger.config";
import cors_config from "./configs/cors.config";
import jwt_config from "./configs/jwt.config";

const fastify = Fastify({
  logger: logger_config, 
});

fastify.register(fastifyCors, cors_config);
fastify.register(fastifyHelmet)
fastify.register(fastifyJwt, jwt_config.access);
fastify.register(fastifyJwt, jwt_config.refresh);

export default fastify;

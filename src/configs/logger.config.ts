import { env } from "./env.config";

const logger_config = {
  production: {
    level: "error",
    base: null,
    timestamp: false,
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  development: {
    level: "info",
    base: null,
    timestamp: false,
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
    serializers: {
      req: (request: import("fastify").FastifyRequest) => {

        const body: any = { ...request.body as any };
        delete body.password;

        const { authorization, ...headers } = request.headers;
        
        return {
          body, 
          headers,
        };
      },
    },
  },
  test: {},
};

export default logger_config[env.NODE_ENV];

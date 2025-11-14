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
        const raw_body = { ...(request.body as any) };
        delete raw_body.password;
        delete raw_body.confirmPassword;

        const headers = { ...request.headers };
        delete headers.authorization?.split(" ")[1];
        
        return {
          raw_body,
          headers,
        };
      },
    },
  },
  test: {},
};

export default logger_config[env.NODE_ENV];

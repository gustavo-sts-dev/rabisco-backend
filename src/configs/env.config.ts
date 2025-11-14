import { loadEnvFile, env as enviroments } from "process";
import { z } from "zod";

loadEnvFile()
const env_schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]).default("development"),
  PORT: z.coerce.number().positive().optional(),
  ALLOWED_ORIGINS: z.url(),
  ACCESS_SECRET: z.string().min(32),
  ACCESS_EXPIRES_IN: z.string().default("15m"),
  REFRESH_SECRET: z.string().min(32),
  REFRESH_EXPIRES_IN: z.string().default("7d"),
});

export const env = env_schema.parse(enviroments);
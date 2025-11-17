import { env } from "./env.config";

export const connection_uri = env.NODE_ENV === "production" ? env.MONGODB_URI : "mongodb://127.0.0.1:27017/rabisco";

export const database_config = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 5,
};
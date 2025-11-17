import { env } from "./env.config";

interface JWTConfig {
  secret: string;
  expiresIn: string;
}

export const access: JWTConfig = {
    secret: env.ACCESS_SECRET,
    expiresIn: env.ACCESS_EXPIRES_IN
}

export const refresh = {
  secret: env.REFRESH_SECRET,
  expiresIn: env.REFRESH_EXPIRES_IN,
};
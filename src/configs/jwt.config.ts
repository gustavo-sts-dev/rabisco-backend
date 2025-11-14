import { env } from "./env.config";

const jwt_config = {
  access: {
    secret: env.ACCESS_SECRET,
    sign: {
      expiresIn: env.ACCESS_EXPIRES_IN,
    },
    namespace: "access_token",
  },
  refresh: {
    secret: env.REFRESH_SECRET,
    sign: {
      expiresIn: env.REFRESH_EXPIRES_IN,
    },
    namespace: "refresh_token",
  },
};

export default jwt_config
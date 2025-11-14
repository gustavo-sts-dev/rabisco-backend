import { env } from "./env.config";

const cors_config = {
  origin: env.ALLOWED_ORIGINS,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  headers: ["Content-Type"]
}

export default cors_config
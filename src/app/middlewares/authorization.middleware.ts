import { access } from "@configs/jwt.config";
import type { IJwtPayload } from "@shared/types/jwt.types";
import type { FastifyRequest, FastifyReply } from "fastify"
import jwt from "jsonwebtoken";

export async function authorized(req: FastifyRequest, rep: FastifyReply) {
  try {   
    const tokenHeaders = req.headers.authorization?.split(" ")[1]
    const { _id, email } = jwt.verify(tokenHeaders as string, access.secret) as IJwtPayload;

    req["user"] = {
      _id,
      email
    } 

    return
  } catch (e) {
    rep.status(401).send("Token expirado ou inválido!")
  }
}
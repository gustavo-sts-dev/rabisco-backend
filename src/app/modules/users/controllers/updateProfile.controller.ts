import type { FastifyReply, FastifyRequest } from "fastify";
import { jwtUserSchema } from "@shared/schema/jwt.schema";
import { updateProfileSchema } from "../schemas/updateProfile.schema";
import { serviceUpdateProfile } from "../services/updateProfile.service";
import { AppError } from "@shared/errors/AppError";
import { ZodError } from "zod";

export async function updateProfile(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = updateProfileSchema.parse(req.body);
    const user = jwtUserSchema.parse(req["user"]);
    const data = await serviceUpdateProfile(user, payload);

    rep.status(200).send(data);
  } catch (e) {
    if (e instanceof ZodError) {
      return rep.status(400).send({
        message: "Dados inválidos",
        errors: e.issues,
      });
    }

    if (e instanceof AppError) {
      return rep.status(e["statusCode"]).send({ message: e.message });
    }

    rep.status(500).send({ message: "Erro interno do servidor" });
  }
}

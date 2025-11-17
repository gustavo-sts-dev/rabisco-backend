import type { FastifyReply, FastifyRequest } from "fastify";
import { updatePasswordSchema } from "../schemas/updatePassword.schema";
import { serviceUpdatePassword } from "../services/updatePassword.service";
import { jwtUserSchema } from "@shared/schema/jwt.schema";
import { AppError } from "@shared/errors/AppError";
import { ZodError } from "zod";

export async function updatePassword(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = updatePasswordSchema.parse(req.body);
    const { _id } = jwtUserSchema.parse(req["user"]);

    const data = await serviceUpdatePassword(_id, payload);

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

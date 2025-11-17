import type { FastifyReply, FastifyRequest } from "fastify";
import { registerSchema } from "../schemas/register.schema";
import { serviceRegisterUser } from "../services";
import { AppError } from "@shared/errors/AppError";
import { ZodError } from "zod";

export async function registerUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await serviceRegisterUser(payload);

    rep.status(201).send({
      message: `Usuário ${user.username} criado com sucesso!`,
      data: user,
    });
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

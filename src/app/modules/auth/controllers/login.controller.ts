import type { FastifyReply, FastifyRequest } from "fastify";
import { loginSchema } from "../schemas/login.schema";
import { serviceLoginUser } from "../services";
import { AppError } from "@shared/errors/AppError";
import { ZodError } from "zod";

export async function loginUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = loginSchema.parse(req.body);
    const data = await serviceLoginUser(payload);

    rep.status(200).send({ data });
  } catch (e) {
    if (e instanceof ZodError) {
      return rep.status(400).send({
        message: "Dados inválidos",
        errors: e.issues,
      });
    }

    if (e instanceof AppError) {
      return rep.status(e.statusCode).send({ message: e.message });
    }

    rep.status(500).send({ message: "Erro interno do servidor" });
  }
}

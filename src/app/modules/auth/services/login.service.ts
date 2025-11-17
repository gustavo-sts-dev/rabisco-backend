import jwt, { type SignOptions } from "jsonwebtoken";
import User, { type IUserDocument } from "../../users/users.model";
import { access } from "@configs/jwt.config";
import type { loginSchema } from "../schemas/login.schema";
import type z from "zod";
import { UnauthorizedError } from "@shared/errors/AppError";

export async function serviceLoginUser({
  email,
  password,
}: z.infer<typeof loginSchema>) {
  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    throw new UnauthorizedError("Credenciais inválidas!");
  }

  const loginApproved = await existingUser.comparePasswords(password);

  if (!loginApproved) {
    throw new UnauthorizedError("Credenciais inválidas!");
  }

  const user = existingUser.toObject({
    transform: (doc, ret: Partial<IUserDocument>) => {
      delete ret["password"];
      delete ret["createdAt"];
      delete ret["updatedAt"];
      return ret;
    },
  });

  const accessToken = jwt.sign(user, access.secret, {
    expiresIn: access.expiresIn,
  } as SignOptions);

  return {
    message: "Login bem sucedido!",
    user,
    accessToken,
  };
}

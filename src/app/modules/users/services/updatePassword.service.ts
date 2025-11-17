import User from "../users.model";
import { updatePasswordSchema } from "../schemas/updatePassword.schema";
import type z from "zod";

export async function serviceUpdatePassword(
  _id: string,
  { password, newPassword }: z.infer<typeof updatePasswordSchema>
) {
  await User.updatePassword(_id, password, newPassword);
  return { message: "Senha atualizada com sucesso." };
}

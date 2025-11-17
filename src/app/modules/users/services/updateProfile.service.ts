import type z from "zod";
import { jwtUserSchema } from "@shared/schema/jwt.schema";
import { updateProfileSchema } from "../schemas/updateProfile.schema";
import User from "../users.model";

export async function serviceUpdateProfile(
  user: z.infer<typeof jwtUserSchema>,
  payload: z.infer<typeof updateProfileSchema>
) {
  await User.findByIdAndUpdate(user._id, payload);

  return { message: "Perfil atualizado com sucesso." };
}

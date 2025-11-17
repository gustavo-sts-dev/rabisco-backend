import User from "../../users/users.model";
import type { IUserDocument } from "../../users/users.model";
import type { registerSchema } from "../schemas/register.schema";
import type z from "zod";

export async function serviceRegisterUser({
  username,
  name,
  email,
  password,
}: z.infer<typeof registerSchema>) {
  const user = await User.create({ username, name, email, password });

  return user.toObject({
      transform(doc, ret: Partial<IUserDocument>, options) {
        delete ret.password;

        return ret;
      },
    })
}

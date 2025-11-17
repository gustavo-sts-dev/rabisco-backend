import { z } from "zod";

export const jwtUserSchema = z.object({
  _id: z.string(),
  email: z.string(),
});

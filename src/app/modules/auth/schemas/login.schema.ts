import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});

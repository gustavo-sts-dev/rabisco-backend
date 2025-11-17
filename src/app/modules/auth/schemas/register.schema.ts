import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)
      .max(24),
    name: z.string().max(24),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    confirmPassword: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

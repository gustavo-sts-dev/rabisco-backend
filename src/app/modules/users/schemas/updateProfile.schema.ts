import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
});

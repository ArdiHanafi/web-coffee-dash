import { z } from "zod";

export const NextAuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(3, "Password minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
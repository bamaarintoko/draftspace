import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    role: z.enum(["User", "Admin"], {
        required_error: "Role wajib dipilih",
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
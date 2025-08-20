import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address (e.g. name@example.com)")
    .nonempty("Email field cannot be left blank"),
    
  password: z
    .string()
    .nonempty("Password field cannot be left blank")
    .min(8, "Password must be at least 8 characters "),
});

export type LoginValues = z.infer<typeof loginSchema>;

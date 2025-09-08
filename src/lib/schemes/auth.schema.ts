import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Login Schema
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

// Register Schema
export const registerSchema = z
  .object({
    firstName: z
      .string("First name must be a string")
      .nonempty("First name is required"),

    lastName: z
      .string("Last name must be a string")
      .nonempty("Last name is required"),

    username: z
      .string("Username must be a string")
      .nonempty("Username is required"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Min 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    rePassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(8, "Min 8 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

// Forgot Password Step Schema
export const forgotPasswordSchema = registerSchema.pick({ email: true });

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Verify OTP
export const otpSchema = z.object({
  resetCode: z
    .string()
    .min(6, { message: "Your one‑time password must be 6 characters." }),
});
export type OtpValues = z.infer<typeof otpSchema>;

// Create Password Step Schema
export const createPasswordSchema = registerSchema.pick({
  password: true,
  rePassword: true,
  email: true,
});

export type CreatePasswordValues = z.infer<typeof createPasswordSchema>;

// Edit User Data
export const editUserDataSchema = registerSchema.pick({
  email: true,
  username: true,
  lastName: true,
  firstName: true,
  phone: true,
});

export type EditUserDataValues = z.infer<typeof editUserDataSchema>;

// Edit user password
export const editUserPasswordSchema = registerSchema
  .pick({
    password: true,
    rePassword: true,
  })
  .extend({
    oldPassword: z
      .string()
      .nonempty("Current password is required")
      .min(8, "Min 8 characters"),
  });

export type EditUserPasswordValues = z.infer<typeof editUserPasswordSchema>;

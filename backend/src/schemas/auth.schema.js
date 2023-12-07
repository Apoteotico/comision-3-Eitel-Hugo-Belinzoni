import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  })
  .min(6, {
    message: "Name must be at least 6 characters",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

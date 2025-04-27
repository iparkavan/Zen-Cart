import { z } from "zod";

export const eamilSchema = z
  .string()
  .email("Invalid email address")
  .min(1)
  .max(225);

export const passwordSchema = z.string().trim().min(4);

export const verifyEmailSchema = z.object({
  email: eamilSchema,
});

export const registerAsCustomerSchema = z.object({
  name: z.string().min(1).max(225),
  email: eamilSchema,
  password: passwordSchema,
});

export const registerAsSellerSchema = z.object({
  name: z.string().min(1).max(225),
  email: eamilSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: eamilSchema,
  password: passwordSchema,
});

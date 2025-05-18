import { z } from "zod";

export const eamilSchema = z
  .string()
  .email("Invalid email address")
  .min(1)
  .max(225);

export const passwordSchema = z.string().trim().min(4);

export const phoneSchema = z
  .string()
  .min(6, "Phone number too short")
  .max(20, "Phone number too long")
  .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number format");

export const verifyEmailSchema = z.object({
  email: eamilSchema,
});

export const registerAsCustomerSchema = z.object({
  name: z.string().min(1).max(225),
  email: eamilSchema,
  password: passwordSchema,
});

export const customerAdditionalInfoSchema = z.object({
  phone: phoneSchema,
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

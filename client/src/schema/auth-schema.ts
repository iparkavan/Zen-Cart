import { z } from "zod";

// export const formLoginSchema = z.object({
//   name: z.string().min(3),
//   email: z.string().email(),
//   //   username: z.string().min(3),
//   password: z.string().min(6),
// });

// export type IFormDataType = z.infer<typeof formLoginSchema>;

// src/schemas/signupSchema.ts

export const signupSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"],
// });

export type SignupSchemaType = z.infer<typeof signupSchema>;

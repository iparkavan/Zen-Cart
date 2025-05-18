import { z } from "zod";

export const formLoginSchema = z.object({
  email: z.string().email(),
  //   username: z.string().min(3),
  password: z.string().min(6),
});

export type IFormDataType = z.infer<typeof formLoginSchema>;

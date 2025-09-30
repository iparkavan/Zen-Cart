import { z } from "zod";

export const addToCartSchema = z.object({
  // userId: z.string().min(1, "User ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int("Quantity must be an integer"),
});

// ✅ Type inference (optional)
export type AddToCartInput = z.infer<typeof addToCartSchema>;

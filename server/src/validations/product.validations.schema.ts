import { z } from "zod";
import { makeFieldsOptional } from "../utils/make-fields-optional";

// 1. Define the base/common fields separately
const productFields = {
  // sellerId: z.string().min(1, "Seller ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  originalPrice: z.number().positive("Original price must be positive"),
  offerPrice: z.number().positive("Offer price must be positive").optional(),
  categoryName: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  images: z
    .array(z.string().url("Image must be a valid URL"))
    .nonempty("At least one image is required"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
  tags: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        color: z.string().optional(),
        size: z.string().optional(),
        stock: z.number().int().nonnegative(),
        price: z.number().positive().optional(),
      })
    )
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  deliveryInfo: z.string().optional(),
  returnPolicy: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
};

// 2. Create the create schema (all important fields are required)
export const createProductSchema = z.object(productFields);

// 3. Create the update schema (all fields are optional in update)
export const updateProductSchema = z.object(makeFieldsOptional(productFields));

export const productIdSchema = z
  .string()
  .trim()
  .min(1, "Product Id is required");

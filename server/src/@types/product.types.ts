// src/types/product.types.ts
import { z } from "zod";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validations.schema";

export type ICreateProductTypes = z.infer<typeof createProductSchema>;

export type IUpdateProductTypes = z.infer<typeof updateProductSchema>;

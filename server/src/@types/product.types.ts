// src/types/product.types.ts
import { z } from "zod";
import { createProductSchema } from "../validations/product.validations.schema";

export type ICreateProductTypes = z.infer<typeof createProductSchema>;

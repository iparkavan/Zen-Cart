import { Types } from "mongoose";
import ProductModel from "../models/product.model";

export const getCategoryByIdService = async (categoryId: string) => {
  const products = await ProductModel.find({
    categoryId: new Types.ObjectId(categoryId),
  }).populate("categoryId");

  console.log(categoryId, products);

  return { products };
};

import { Types } from "mongoose";
import ProductModel from "../models/product.model";
import CategoryModel from "../models/category.model";
import { NotFoundException } from "../utils/app-error";

export const getCategoryByIdService = async (categoryId: string) => {
  const products = await ProductModel.find({
    categoryId: new Types.ObjectId(categoryId),
  }).populate("categoryId");

  return { products };
};

export const getAllCategoryService = async () => {
  const categories = await CategoryModel.find();

  if (!categories) {
    throw new NotFoundException("Categories not found");
  }

  return { categories };
};

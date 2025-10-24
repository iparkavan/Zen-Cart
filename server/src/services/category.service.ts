import { Types } from "mongoose";
import ProductModel, { IProduct } from "../models/product.model";
import CategoryModel from "../models/category.model";
import { NotFoundException } from "../utils/app-error";

export const getAllCategoryService = async () => {
  const categories = await CategoryModel.find();

  if (!categories) {
    throw new NotFoundException("Categories not found");
  }

  return { categories };
};

export const getFilterByCategoryService = async (
  category: string
): Promise<{ products: IProduct[] }> => {
  let products: IProduct[];

  if (category.toLowerCase() === "all") {
    // Fetch all products
    products = await ProductModel.find().populate("categoryId");
  } else {
    // Find category by slug
    const categoryDoc = await CategoryModel.findOne({
      slug: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (!categoryDoc) {
      throw new NotFoundException(`Category '${category}' not found`);
    }

    // Fetch products by categoryId
    products = await ProductModel.find({
      categoryId: categoryDoc._id,
    }).populate("categoryId");
  }

  if (!products || products.length === 0) {
    throw new NotFoundException(`No products found for category '${category}'`);
  }

  return { products };
};

export const getCategoryByIdService = async (categoryId: string) => {
  const products = await ProductModel.find({
    categoryId: new Types.ObjectId(categoryId),
  }).populate("categoryId");

  return { products };
};

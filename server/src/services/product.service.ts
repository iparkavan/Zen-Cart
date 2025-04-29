import { ICreateProductTypes } from "../@types/product.types";
import CategoryModel from "../models/category.model";
import ProductModel from "../models/product.model";

import { validateSellerById } from "./seller.service";

export const createProductService = async (body: ICreateProductTypes) => {
  const {
    sellerId,
    title,
    description,
    originalPrice,
    offerPrice,
    categoryName,
    brand,
    images,
    stock,
    sku,
    variants,
    tags,
    deliveryInfo,
    returnPolicy,
  } = body;

  await validateSellerById(sellerId);

  let category = await CategoryModel.findOne({ name: categoryName });

  if (!category) {
    category = new CategoryModel({
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
    });

    await category.save();
  }

  const newProduct = new ProductModel({
    sellerId,
    title,
    description,
    originalPrice,
    offerPrice,
    category: category._id,
    brand,
    images,
    stock,
    sku,
    variants,
    tags,
    deliveryInfo,
    returnPolicy,
    isActive: true,
  });

  await newProduct.save();

  return { product: newProduct };
};

export const getAllProductsService = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const totalCount = await ProductModel.estimatedDocumentCount();

  const skip = (page - 1) * limit;

  const products = await ProductModel.find()
    .skip(skip)
    .limit(limit)
    .populate("category")
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(totalCount / limit);

  return { totalCount, products, totalPages, skip };
};

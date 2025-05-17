import { Types } from "mongoose";
import {
  ICreateProductTypes,
  IUpdateProductTypes,
} from "../@types/product.types";
import CategoryModel from "../models/category.model";
import ProductModel from "../models/product.model";
import { NotFoundException } from "../utils/app-error";

import { validateSellerById } from "./seller.service";

export const createProductService = async (
  body: ICreateProductTypes,
  sellerId: string
) => {
  const {
    // sellerId,
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
    categoryId: category._id,
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

export const updateProductService = async (
  productId: string,
  sellerId: string,
  data: IUpdateProductTypes
) => {
  await validateSellerById(sellerId); // Authorization

  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new NotFoundException("Product not found");
  }

  // Optional category update
  if (data.categoryName) {
    let category = await CategoryModel.findOne({ name: data.categoryName });

    if (!category) {
      category = new CategoryModel({
        name: data.categoryName,
        slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
      });

      await category.save();
    }

    product.categoryId = category._id as Types.ObjectId;
  }

  // Update other fields
  Object.assign(product, {
    ...data,
    category: product.categoryId, // Ensure category is maintained
  });

  await product.save();

  return product;
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
    .populate("categoryId")
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(totalCount / limit);

  return { totalCount, products, totalPages, skip };
};

export const getProductByIdService = async (productId: string) => {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new NotFoundException("Product not found");
  }

  return { product };
};

export const deleteProductByIdService = async (productId: string) => {
  const product = await ProductModel.findByIdAndDelete(productId);

  if (!product) {
    throw new NotFoundException("Product not found");
  }

  return { product };
};

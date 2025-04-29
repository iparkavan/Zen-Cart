import { validate } from "uuid";
import { ICreateProductTypes } from "../@types/product.types";
import { Roles } from "../enums/role.enum";
import CategoryModel from "../models/category.model";
import ProductModel, { IProduct } from "../models/product.model";
import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
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

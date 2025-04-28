import { ICreateProductTypes } from "../@types/product.types";
import CategoryModel from "../models/category.model";
import ProductModel, { IProduct } from "../models/product.model";

export const createProductService = async (body: ICreateProductTypes) => {
  const {
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

  let category = await CategoryModel.findOne({ name: categoryName });

  if (!category) {
    category = new CategoryModel({
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
    });

    await category.save();
  }

  const newProduct = new ProductModel({
    sellerId: body.sellerId,
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

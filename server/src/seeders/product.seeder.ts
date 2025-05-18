import mongoose from "mongoose";
import dotenv from "dotenv";

// Replace with your actual seed data
import CategoryModel from "../models/category.model";
import ProductModel from "../models/product.model";
import { dummyProducts } from "../data/dummy-product";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    for (const product of dummyProducts) {
      const category = await CategoryModel.findOne({
        name: product.categoryName,
      });
      if (!category) {
        console.error(`❌ Category "${product.categoryName}" not found`);
        continue;
      }

      const exists = await ProductModel.findOne({ sku: product.sku });
      if (exists) {
        console.log(`ℹ️ Product "${product.title}" already exists`);
        continue;
      }

      await ProductModel.create({
        sellerId: "682707a1c9c70de68d01345a",
        title: product.title,
        description: product.description,
        originalPrice: product.originalPrice,
        offerPrice: product.offerPrice,
        category: category._id,
        brand: product.brand,
        images: product.images,
        stock: product.stock,
        sku: product.sku,
        variants: product.variants,
        tags: product.tags,
        deliveryInfo: product.deliveryInfo,
        returnPolicy: product.returnPolicy,
        isActive: true,
      });

      console.log(`✅ Seeded product: ${product.title}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();

// ---------------without - seeder------------------------

// for (const product of products) {
//   const category = await Category.findOne({ name: product.categoryName });
//   if (!category) {
//     console.error(`Category "${product.categoryName}" not found.`);
//     continue;
//   }

//   const existing = await Product.findOne({ sku: product.sku });
//   if (existing) {
//     console.log(`Product "${product.title}" already exists. Skipping...`);
//     continue;
//   }

//   const newProduct = new Product({
//     sellerId: "680f8dc027e9a3d26f56a9f3", // Replace with actual sellerId
//     title: product.title,
//     description: product.description,
//     originalPrice: product.originalPrice,
//     offerPrice: product.offerPrice,
//     category: category._id,
//     brand: product.brand,
//     images: product.images,
//     stock: product.stock,
//     sku: product.sku,
//     variants: product.variants,
//     tags: product.tags,
//     deliveryInfo: product.deliveryInfo,
//     returnPolicy: product.returnPolicy,
//     isActive: true,
//   });

//   await newProduct.save();
//   console.log(`Inserted product: ${product.title}`);
// }

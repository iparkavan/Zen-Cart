// scripts/seedCategories.ts
import mongoose from "mongoose";
import CategoryModel from "../models/category.model";

const categories = [
  "Amazon Launchpad",
  "Amazon Renewed",
  "Apps & Games",
  "Baby Products",
  "Bags, Wallets and Luggage",
  "Beauty",
  "Books",
  "Car & Motorbike",
  "Clothing & Accessories",
  "Computers & Accessories",
  "Electronics",
  "Garden & Outdoors",
  "Gift Cards",
  "Grocery & Gourmet Foods",
  "Health & Personal Care",
  "Home & Kitchen",
  "Home Improvement",
  "Industrial & Scientific",
  "Jewellery",
  "Kindle Store",
  "Movies & TV Shows",
  "Music",
  "Musical Instruments",
  "Office Products",
  "Pet Supplies",
  "Shoes & Handbags",
  "Software",
  "Sports, Fitness & Outdoors",
  "Toys & Games",
  "Video Games",
  "Watches",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/your-db-name");

  for (const name of categories) {
    const slug = slugify(name);
    await CategoryModel.updateOne({ slug }, { name, slug }, { upsert: true });
  }

  console.log("✅ Categories seeded");
  process.exit();
}

seed();

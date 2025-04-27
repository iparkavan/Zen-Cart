import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  sellerId: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Types.ObjectId[];
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    images: [String],
    stock: Number,
    rating: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>("Product", productSchema);
export default ProductModel;

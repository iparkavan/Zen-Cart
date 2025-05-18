import { Schema, Types, Document, model } from "mongoose";

// Interface for Product
export interface IProduct extends Document {
  sellerId: Types.ObjectId;
  title: string;
  description: string;
  originalPrice: number;
  offerPrice?: number;
  discountPercentage?: number;
  categoryId: Types.ObjectId; // Reference to the Category model
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Types.ObjectId[];
  tags?: string[];
  sku: string;
  variants?: Array<{
    color?: string;
    size?: string;
    stock: number;
    price?: number;
  }>;
  isFeatured?: boolean;
  sold?: number;
  deliveryInfo?: string;
  returnPolicy?: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    offerPrice: { type: Number }, // optional discount price
    discountPercentage: { type: Number }, // optional, can be auto-calculated too
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Reference to Category
    brand: { type: String },
    images: [{ type: String }],
    stock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    tags: [{ type: String }], // e.g., ['New', 'Trending']
    sku: { type: String, unique: true }, // Unique product code
    variants: [
      {
        color: { type: String },
        size: { type: String },
        stock: { type: Number, required: true },
        price: { type: Number }, // price per variant if needed
      },
    ],
    isFeatured: { type: Boolean, default: false },
    sold: { type: Number, default: 0 },
    deliveryInfo: { type: String },
    returnPolicy: { type: String },
    startDate: { type: Date }, // discount start
    endDate: { type: Date }, // discount end
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>("Product", productSchema);
export default ProductModel;

// src/models/SellerProfile.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ISellerProfile extends Document {
  userId: Types.ObjectId;
  storeName: string;
  gstNumber: string;
  address?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sellerProfileSchema = new Schema<ISellerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    storeName: { type: String, required: true },
    gstNumber: { type: String, required: true },
    address: { type: String },
    bankAccountNumber: { type: String },
    ifscCode: { type: String },
  },
  { timestamps: true }
);

const SellerModel = model<ISellerProfile>("SellerProfile", sellerProfileSchema);

export default SellerModel;

import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  customerId: Types.ObjectId;
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  status: string;
  paymentStatus: string;
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    shippingAddress: String,
    status: {
      type: String,
      enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const OrderModel = model<IOrder>("Order", orderSchema);
export default OrderModel;

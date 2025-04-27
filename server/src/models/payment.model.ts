import { Schema, model, Document, Types } from "mongoose";

export interface IPayment extends Document {
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    method: { type: String, enum: ["CARD", "UPI", "COD", "WALLET"] },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    transactionId: String,
  },
  { timestamps: true }
);

const PaymentModel = model<IPayment>("Payment", paymentSchema);
export default PaymentModel;

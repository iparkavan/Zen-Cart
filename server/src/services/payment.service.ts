// src/services/payment.service.ts
import crypto from "crypto";
import { razorpayConfig } from "../config/razorpay-config";
import PaymentModel from "../models/payment.model";
import OrderModel, { IOrder } from "../models/order.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";

interface PaymentInput {
  orderId: string;
  userId: string;
  amount: number;
  method: string;
  transactionId?: string;
}

interface RazorpayOrderInput {
  orderId: string;
  userId: string;
  amount: number; // in INR
  method: string;
}

// POST /api/payments/initiate
export const initiatePaymentService = async (orderId: string) => {
  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new NotFoundException("Order not found");
  }

  if (order.totalAmount < 1) {
    throw new Error("Order total must be at least 1 INR for Razorpay");
  }
  const amountInPaise = Math.round(order.totalAmount * 100); // integer

  if (amountInPaise < 100) {
    throw new BadRequestException("Order total must be at least 1 INR");
  }

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `receipt_${order._id}`,
  };

  // const amountInPaise = Math.round(Number(order.totalAmount) * 100);

  // const options = {
  //   amount: amountInPaise,
  //   currency: "INR",
  //   receipt: `receipt_${order._id}`,
  // };

  const razorpayOrder = await razorpayConfig.orders.create(options);

  await PaymentModel.create({
    orderId: order._id,
    userId: order.customerId,
    amount: order.totalAmount,
    method: "CARD",
    transactionId: razorpayOrder.id,
    status: "PENDING",
  });

  return {
    key: process.env.RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    orderId: razorpayOrder.id,
  };
};

// 2️⃣ Verify Payment Signature from Razorpay
export const verifyPaymentService = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  // 1️⃣ Generate signature server-side using your secret key
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // 2️⃣ Compare with Razorpay’s signature
  if (generatedSignature !== razorpay_signature) {
    throw new Error("❌ Invalid Razorpay signature");
  }

  // 3️⃣ Update payment and order securely
  const payment = await PaymentModel.findOneAndUpdate(
    { transactionId: razorpay_order_id },
    {
      transactionId: razorpay_payment_id,
      status: "COMPLETED",
    },
    { new: true }
  );

  if (!payment) throw new Error("Payment record not found");

  await OrderModel.findByIdAndUpdate(payment.orderId, {
    paymentStatus: "PAID",
  });

  return { success: true, message: "Payment verified successfully" };
};

export const createPaymentService = async (paymentData: PaymentInput) => {
  // 1️⃣ Create a new payment
  const payment = await PaymentModel.create(paymentData);

  // 2️⃣ Update order payment status
  await OrderModel.findByIdAndUpdate(paymentData.orderId, {
    paymentStatus: "PAID",
  });

  return payment;
};

export const getPaymentByOrderIdService = async (orderId: string) => {
  const payment = await PaymentModel.findOne({ orderId });
  return payment;
};

export const updatePaymentStatusService = async (
  paymentId: string,
  status: string
) => {
  const payment = await PaymentModel.findByIdAndUpdate(
    paymentId,
    { status },
    { new: true }
  );
  return payment;
};

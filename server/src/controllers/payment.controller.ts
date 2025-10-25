import crypto from "crypto";
import PaymentModel from "../models/payment.model";
import OrderModel from "../models/order.model";
// src/controllers/payment.controller.ts
import { Request, Response } from "express";
import {
  createPaymentService,
  getPaymentByOrderIdService,
  initiatePaymentService,
  updatePaymentStatusService,
  verifyPaymentService,
} from "../services/payment.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";

// 1️⃣ Create Razorpay Order
export const initiatePaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.body.orderId;

    const data = await initiatePaymentService(orderId);

    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Razorpay order created successfully",
      data,
    });
  }
);

// 2️⃣ Verify Payment Signature
export const verifyPaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await verifyPaymentService(req.body);

    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Payment verified successfully",
      data,
    });
  }
);

export const createPaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const payment = await createPaymentService(req.body);
    res.status(HTTPSTATUS.CREATED).json({
      success: true,
      message: "Payment processed successfully",
      payment,
    });
  }
);

export const getPaymentByOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const payment = await getPaymentByOrderIdService(orderId);
    if (!payment) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        message: "Payment not found for this order",
      });
    }
    res.status(HTTPSTATUS.OK).json({ success: true, payment });
  }
);

export const updatePaymentStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const payment = await updatePaymentStatusService(id, status);
    res.status(HTTPSTATUS.OK).json({ success: true, payment });
  }
);

// ---------------------------------------------------------------------
// controllers/payment.controller.ts

export const razorpayWebhookController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

      // Verify Razorpay signature
      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");

      if (digest !== req.headers["x-razorpay-signature"]) {
        return res.status(400).json({ message: "Invalid signature" });
      }

      const event = req.body.event;

      if (event === "payment.captured") {
        const paymentData = req.body.payload.payment.entity;

        // Update Payment and Order records
        await PaymentModel.findOneAndUpdate(
          { transactionId: paymentData.id },
          { status: "COMPLETED" }
        );

        await OrderModel.findOneAndUpdate(
          { _id: paymentData.notes.orderId },
          { paymentStatus: "PAID" }
        );
      }

      if (event === "payment.failed") {
        const paymentData = req.body.payload.payment.entity;

        await PaymentModel.findOneAndUpdate(
          { transactionId: paymentData.id },
          { status: "FAILED" }
        );

        await OrderModel.findOneAndUpdate(
          { _id: paymentData.notes.orderId },
          { paymentStatus: "FAILED" }
        );
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook handling failed" });
    }
  }
);

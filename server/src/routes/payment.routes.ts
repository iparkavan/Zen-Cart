// src/routes/payment.routes.ts
import express from "express";
import {
  createPaymentController,
  getPaymentByOrderController,
  initiatePaymentController,
  razorpayWebhookController,
  updatePaymentStatusController,
  verifyPaymentController,
} from "../controllers/payment.controller";

const paymentRoutes = express.Router();

// Step 1: Initiate Payment
paymentRoutes.post("/initiate", initiatePaymentController);

// Step 2: Verify Signature
paymentRoutes.post("/verify", verifyPaymentController);

paymentRoutes.post(
  "/razorpay/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhookController
);

paymentRoutes.post("/", createPaymentController);

paymentRoutes.get("/order/:orderId", getPaymentByOrderController);

paymentRoutes.patch("/:id/status", updatePaymentStatusController);

export default paymentRoutes;

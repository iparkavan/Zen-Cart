// src/routes/order.routes.ts
import express from "express";
import {
  createOrderController,
  getOrderByIdController,
  getUserOrdersController,
  updateOrderStatusController,
} from "../controllers/order.controller";

const orderRoutes = express.Router();

orderRoutes.post("/create", createOrderController);
orderRoutes.get("/:id", getOrderByIdController);
orderRoutes.get("/user/:userId", getUserOrdersController);
orderRoutes.patch("/:id/status", updateOrderStatusController);

export default orderRoutes;

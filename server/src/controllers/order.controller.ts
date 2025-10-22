// src/controllers/order.controller.ts
import { Request, Response } from "express";
import {
  createOrderService,
  getOrderByIdService,
  getOrdersByUserService,
  updateOrderStatusService,
} from "../services/order.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";

export const createOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await createOrderService(req.body);

    res.status(HTTPSTATUS.CREATED).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  }
);

export const getOrderByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await getOrderByIdService(id);
    if (!order) {
      return res
        .status(HTTPSTATUS.NOT_FOUND)
        .json({ success: false, message: "Order not found" });
    }
    res.status(HTTPSTATUS.OK).json({ success: true, order });
  }
);

export const getUserOrdersController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const orders = await getOrdersByUserService(userId);
    res.status(HTTPSTATUS.OK).json({ success: true, orders });
  }
);

export const updateOrderStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await updateOrderStatusService(id, status);
    res.status(HTTPSTATUS.OK).json({ success: true, order });
  }
);

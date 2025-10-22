// src/services/order.service.ts
import OrderModel from "../models/order.model";
import { IOrder } from "../models/order.model";

export const createOrderService = async (orderData: IOrder) => {
  const order = await OrderModel.create(orderData);
  return order;
};

export const getOrderByIdService = async (orderId: string) => {
  const order = await OrderModel.findById(orderId).populate("items.productId");
  return order;
};

export const getOrdersByUserService = async (userId: string) => {
  const orders = await OrderModel.find({ customerId: userId })
    .sort({ createdAt: -1 })
    .populate("items.productId");
  return orders;
};

export const updateOrderStatusService = async (
  orderId: string,
  status: string
) => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  return order;
};

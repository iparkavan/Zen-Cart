import { CartItem } from "./cart-type";

export interface IOrderPayload {
  customerId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  _id: string;
}

export interface IOrder {
  customerId: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: string;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  _id: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}

export interface CreateOrderResponseType {
  success: boolean;
  message: string;
  order: IOrder;
}

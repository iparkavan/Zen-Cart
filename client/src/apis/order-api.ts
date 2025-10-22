import axiosInstance from "@/lib/axios-client";
import { CreateOrderResponseType, IOrderPayload } from "@/types/order-types";

export const createOrderMutationFn = async (
  data: IOrderPayload
): Promise<CreateOrderResponseType> => {
  const res = await axiosInstance.post(`/orders/create`, data);
  return res.data;
};

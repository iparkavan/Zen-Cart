import axiosInstance from "@/lib/axios-client";

export const initiatePaymentMutationFn = async (data: { orderId: string }) => {
  const res = await axiosInstance.post(`/payments/initiate`, data);
  return res.data;
};

export const verifyPaymentMutationFn = async (data: any) => {
  const res = await axiosInstance.post(`/payments/verify`, data);
  return res.data;
};

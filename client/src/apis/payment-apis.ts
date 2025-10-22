import axiosInstance from "@/lib/axios-client";

export const initiatePaymentMutationFn = async (data: { orderId: string }) => {
  const res = await axiosInstance.post(`/payments/initiate`, data);
  return res.data;
};

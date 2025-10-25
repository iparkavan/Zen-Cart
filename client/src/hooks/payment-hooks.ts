import {
  initiatePaymentMutationFn,
  verifyPaymentMutationFn,
} from "@/apis/payment-apis";
import { useMutation } from "@tanstack/react-query";

export const usePaymentInitiate = () => {
  return useMutation({
    mutationKey: ["initiate-payment"],
    mutationFn: initiatePaymentMutationFn,
  });
};

export const useVerifyPaymentInitiate = () => {
  return useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: verifyPaymentMutationFn,
  });
};

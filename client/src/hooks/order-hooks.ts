import { createOrderMutationFn } from "@/apis/order-api";
import { useMutation } from "@tanstack/react-query";

export const useOrdersCreate = () => {
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: createOrderMutationFn,
  });
};

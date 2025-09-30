import {
  addToCartMutationFn,
  deleteCartItemMutatefn,
  getAllCartProductsQueryFn,
} from "@/apis/cart-api";
import { IAddToCartType } from "@/types/cart-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddAndRemoveToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: ({ data }: { data: IAddToCartType }) =>
      addToCartMutationFn(data),
    onSuccess: () => {
      // Invalidate to refetch cart items
      queryClient.invalidateQueries({ queryKey: ["all-cart-items"] });
    },
  });
};

export const useGetAllCartItems = () => {
  return useQuery({
    queryKey: ["all-cart-items"], // distinct query key for fetching cart items
    queryFn: () => {
      return getAllCartProductsQueryFn();
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: (productId: string) => deleteCartItemMutatefn(productId),
    onSuccess: () => {
      // Invalidate to refetch cart items
      queryClient.invalidateQueries({ queryKey: ["all-cart-items"] });
    },
  });
};

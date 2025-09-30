import axiosInstance from "@/lib/axios-client";
import {
  AddToCartResponseType,
  GetCartItemsResponse,
  IAddToCartType,
} from "@/types/cart-type";

export const addToCartMutationFn = async (
  // userId: string,
  data: IAddToCartType
): Promise<AddToCartResponseType> => {
  const res = await axiosInstance.post(`/cart/addToCart`, data);
  return res.data;
};

export const getAllCartProductsQueryFn =
  async (): Promise<GetCartItemsResponse> => {
    const res = await axiosInstance.get(`/cart/getAllCartItems`);
    return res.data;
  };

export const deleteCartItemMutatefn = async (
  productId: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete(`/cart/deleteCartItem/${productId}`);
  return res.data;
};

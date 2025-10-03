// hooks/useAddToCartWithCart.ts

import { useGuestCartStore } from "@/stores/cart-info-store";
import { useUserStore } from "@/stores/user-info-store";
import { useAddAndRemoveToCart, useDeleteCartItem } from "../cart-hooks";

// utils/merge-cart.ts
import { addToCartMutationFn } from "@/apis/cart-api";
import { useState } from "react";
import { CartItem } from "@/types/cart-type";

export const mergeGuestCartIntoBackend = async (userId: string) => {
  const guestItems = useGuestCartStore.getState().items;

  for (const item of guestItems) {
    await addToCartMutationFn({
      productId: item._id,
      quantity: item.quantity,
    });
  }

  // clear guest cart after merge
  useGuestCartStore.getState().clear();
};

export const useAddToCartWithCart = () => {
  const { user } = useUserStore();
  const guestCart = useGuestCartStore();
  const { mutate, isPending } = useAddAndRemoveToCart();

  const addItemToCart = (product: CartItem, quantity = 1) => {
    if (user) {
      // Logged in → backend
      mutate({ data: { productId: product._id, quantity } });
    } else {
      // Guest → local storage
      guestCart.addItem(product);
    }
  };

  return {
    addItemToCart,
    isPending,
  };
};

export const useRemoveItemWithCart = () => {
  const { user } = useUserStore();
  const guestCart = useGuestCartStore();
  const { mutate, isPending } = useDeleteCartItem();
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const deleteItemFromTheCart = (productId: string) => {
    if (user) {
      mutate(productId, {
        onSettled: () => {
          setDeletingItemId(null);
        },
      });
    } else {
      guestCart.removeItem(productId);
    }
  };

  return {
    deleteItemFromTheCart,
    isPending,
    setDeletingItemId,
    deletingItemId,
  };
};

export const useIncrementItemWithCart = () => {
  const { user } = useUserStore();
  const guestCart = useGuestCartStore();
  const { mutate, isPending } = useAddAndRemoveToCart();

  const incrementCartItem = (product: CartItem, quantity = 1) => {
    if (user) {
      // Logged in → backend
      mutate({ data: { productId: product._id, quantity } });
    } else {
      // Guest → local storage
      guestCart.incrementItem(product._id);
    }
  };

  return {
    incrementCartItem,
    isPending,
  };
};

export const useDecrementItemWithCart = () => {
  const { user } = useUserStore();
  const guestCart = useGuestCartStore();
  const { mutate, isPending } = useAddAndRemoveToCart();

  const decrementCartItem = (product: CartItem, quantity = -1) => {
    if (user) {
      // Logged in → backend
      mutate({ data: { productId: product._id, quantity } });
    } else {
      // Guest → local storage
      guestCart.decrementItem(product._id);
    }
  };

  return {
    decrementCartItem,
    isPending,
  };
};

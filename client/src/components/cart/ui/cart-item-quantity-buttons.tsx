import { Button } from "@/components/ui/button";
import {
  useDecrementItemWithCart,
  useIncrementItemWithCart,
  useRemoveItemWithCart,
} from "@/hooks/cart-hook-logic/cart-logic-hooks";
import { useGetAllCartItems } from "@/hooks/cart-hooks";
import { useGuestCartStore } from "@/stores/cart-info-store";
import { useUserStore } from "@/stores/user-info-store";
import { Product } from "@/types/product-types";
import { Loader, Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

interface CartItemQuantityButtonsProps {
  item: Product;
  quantity: number;
}

const CartItemQuantityButtons: React.FC<CartItemQuantityButtonsProps> = ({
  item,
  quantity,
}) => {
  const { user } = useUserStore();
  const { data } = useGetAllCartItems();
  // const { addItem } = useCartInfoStore();
  // const {} = useAddToCartWithGuest();

  const { items: guestCartItems } = useGuestCartStore();

  const { incrementCartItem, isPending: isIncrementPending } =
    useIncrementItemWithCart();
  const { decrementCartItem, isPending: isDecrementPending } =
    useDecrementItemWithCart();

  const {
    deleteItemFromTheCart,
    isPending: isDeletePending,
    deletingItemId,
    setDeletingItemId,
  } = useRemoveItemWithCart();

  const cartItems = user?._id ? data?.cartItems : guestCartItems;

  const onRemoveItem = (id: string) => {
    setDeletingItemId(id);
    deleteItemFromTheCart(id);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          decrementCartItem({
            _id: item._id,
            productId: item,
            quantity: -1,
          })
        }
        className="h-8 w-8"
      >
        {isDecrementPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          incrementCartItem({
            _id: item._id,
            productId: item,
            quantity: 1,
          })
        }
        className="h-8 w-8"
      >
        {isIncrementPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onRemoveItem(item._id)}
        disabled={isDeletePending}
        className="h-8 w-8 ml-4"
      >
        {isDeletePending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default CartItemQuantityButtons;

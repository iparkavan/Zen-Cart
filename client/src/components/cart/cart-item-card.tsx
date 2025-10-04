import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDecrementItemWithCart,
  useIncrementItemWithCart,
} from "@/hooks/cart-hook-logic/cart-logic-hooks";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product-types";
import { Loader, Minus, Plus, Trash2 } from "lucide-react";
import CartItemQuantityButtons from "./ui/cart-item-quantity-buttons";

interface CartItemCardProps {
  item: Product;
  quantity: number;
  isDeletePending: boolean;
  // onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartItemCard = ({
  item,
  quantity,
  onRemoveItem,
  isDeletePending,
}: // onUpdateQuantity,
CartItemCardProps) => {
  return (
    <Card className="mb-2">
      <CardContent className="">
        <div className="flex items-center space-x-4">
          <img
            src={item?.images[0]}
            alt={item?.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item?.title}</h3>
            {item?.description && (
              <p className="text-muted-foreground text-sm">
                {item?.description}
              </p>
            )}
            <p className="text-primary font-bold text-lg">
              ${item?.originalPrice.toFixed(2)}
            </p>
          </div>

          <CartItemQuantityButtons item={item} quantity={quantity} />
        </div>
      </CardContent>
    </Card>
  );
};

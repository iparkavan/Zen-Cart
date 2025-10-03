import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDecrementItemWithCart,
  useIncrementItemWithCart,
} from "@/hooks/cart-hook-logic/cart-logic-hooks";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product-types";
import { Loader, Minus, Plus, Trash2 } from "lucide-react";

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
  const { incrementCartItem } = useIncrementItemWithCart();
  const { decrementCartItem } = useDecrementItemWithCart();

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
              <Minus className="h-4 w-4" />
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
              <Plus className="h-4 w-4" />
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
        </div>
      </CardContent>
    </Card>
  );
};

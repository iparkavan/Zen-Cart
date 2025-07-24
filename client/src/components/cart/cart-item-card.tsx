import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) => {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta);
    if (newQuantity === 0) {
      onRemoveItem(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="mb-2">
      <CardContent className="">
        <div className="flex items-center space-x-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            {item.description && (
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            )}
            <p className="text-primary font-bold text-lg">
              ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemoveItem(item.id)}
              className="h-8 w-8 ml-4"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

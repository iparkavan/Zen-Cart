"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { CartItem } from "@/types/cart";
import { CartItemCard } from "@/components/cart/cart-item-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  // const { toast } = useToast();
  const router = useRouter();

  // Mock cart data - in a real app, this would come from context or state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 299.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      description: "Advanced fitness tracking and smart notifications",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      description: "Portable speaker with premium sound quality",
    },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    router.push("/checkout");
    // toast({
    //   title: "Proceeding to checkout",
    //   description: "Redirecting to payment...",
    // });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className=" mx-auto p-8">
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2" />
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <span className="ml-2 text-muted-foreground">
              ({itemCount} items)
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <Card>
                {/* <CardHeader>
                  <CardTitle></CardTitle>
                </CardHeader> */}
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {/* <Separator /> */}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-sm text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Secure checkout with SSL encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

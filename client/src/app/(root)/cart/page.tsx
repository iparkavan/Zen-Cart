"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { CartItemCard } from "@/components/cart/cart-item-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAddAndRemoveToCart,
  useDeleteCartItem,
  useGetAllCartItems,
} from "@/hooks/cart-hooks";
import { useUserStore } from "@/stores/user-info-store";
import { useGuestCartStore } from "@/stores/cart-info-store";
import { useRemoveItemWithCart } from "@/hooks/cart-hook-logic/cart-logic-hooks";
import CheckoutModal from "@/components/dummy/razorpay-button";
import { useOrderStore } from "@/stores/order-store";
// import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  // const { toast } = useToast();
  const { user } = useUserStore();
  const router = useRouter();
  const { data } = useGetAllCartItems();
  const { orderSummary, setOrderSummary } = useOrderStore();

  const { items: guestCartItems } = useGuestCartStore();

  const {
    deleteItemFromTheCart,
    isPending: isDeletePending,
    deletingItemId,
    setDeletingItemId,
  } = useRemoveItemWithCart();

  const cartItems = user?._id ? data?.cartItems : guestCartItems;

  const handleRemoveItem = (id: string) => {
    setDeletingItemId(id);
    deleteItemFromTheCart(id);
  };

  // const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setOrderSummary({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
      return;
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.productId.originalPrice * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    setOrderSummary({ subtotal, shipping, tax, total });
  }, [cartItems]);

  console.log("Order Summary in Cart Page:", orderSummary);
  // const subtotal =
  //   cartItems && cartItems.length > 0
  //     ? cartItems.reduce(
  //         (sum, item) => sum + item.productId.originalPrice * item.quantity,
  //         0
  //       )
  //     : 0;

  // const shipping = subtotal > 100 ? 0 : 9.99;
  // const tax = subtotal * 0.08; // 8% tax
  // const total = subtotal + shipping + tax;

  const itemCount = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

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
              {/* ({itemCount} items) */}
            </span>
          </div>
        </div>

        {cartItems && cartItems.length === 0 ? (
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
          <>
            {cartItems && cartItems.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                  {cartItems &&
                    cartItems.map((item) => (
                      <CartItemCard
                        key={item._id}
                        item={item.productId}
                        quantity={item.quantity}
                        isDeletePending={
                          isDeletePending &&
                          deletingItemId === item.productId._id
                        }
                        // onUpdateQuantity={onUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                      />
                    ))}
                </div>

                <div className="lg:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>${orderSummary?.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {orderSummary?.shipping === 0
                            ? "FREE"
                            : `$${orderSummary?.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${orderSummary?.tax.toFixed(2)}</span>
                      </div>
                      {/* <Separator /> */}
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${orderSummary?.total.toFixed(2)}</span>
                      </div>
                      {/* {orderSummary?.subtotal < 100 && (
                          <p className="text-sm text-muted-foreground">
                            Add ${(100 - orderSummary?.subtotal).toFixed(2)} more
                            for free shipping!
                          </p>
                        )} */}
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                      {/* <CheckoutModal orderId={} amount={12} /> */}
                      <p className="text-xs text-muted-foreground text-center">
                        Secure checkout with SSL encryption
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

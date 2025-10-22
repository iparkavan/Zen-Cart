"use client";

import { Button } from "@/components/ui/button";
import { useOrdersCreate } from "@/hooks/order-hooks";
import { CartItem } from "@/types/cart-type";
import { useUserStore } from "@/stores/user-info-store";
import { usePaymentInitiate } from "@/hooks/payment-hooks";

export default function PaynowButton({
  cartItems,
  totalAmount,
}: {
  cartItems: CartItem[];
  totalAmount: number;
}) {
  const { mutate: ordersMutate, isPending: isOrdersPending } =
    useOrdersCreate();

  const { mutate: paymentMutate, isPending: isPaymentPending } =
    usePaymentInitiate();

  const { user } = useUserStore();

  const handlePayment = async () => {
    ordersMutate(
      {
        customerId: user?._id || "",
        items: cartItems,
        totalAmount,
        shippingAddress: "123 Main St",
      },
      {
        onSuccess: (data) => {
          paymentMutate(
            { orderId: data.order._id },
            {
              onSuccess: (data) => {
                console.log("Payment initiated:", data);
              },
            }
          );
        },
      }
    );

    // const { key, order } = data;

    // 2️⃣ Initialize Razorpay Checkout
    // const options = {
    //   key,
    //   amount: order.amount,
    //   currency: "INR",
    //   name: "Your Store Name",
    //   description: "Test Transaction",
    //   order_id: order.id,
    //   handler: function (response: any) {
    //     alert("Payment successful!");
    //     console.log("Razorpay response:", response);
    //   },
    //   prefill: {
    //     name: "John Doe",
    //     email: "john@example.com",
    //     contact: "9999999999",
    //   },
    //   theme: { color: "#3399cc" },
    // };

    // const razorpay = new (window as any).Razorpay(options);
    // razorpay.open();

    // setLoading(false);
  };

  return (
    <div className="p-10">
      <Button
        disabled={isOrdersPending}
        onClick={handlePayment}
        // className="bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        {isOrdersPending ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}

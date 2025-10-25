"use client";

import { Button } from "@/components/ui/button";
import { useOrdersCreate } from "@/hooks/order-hooks";
import { CartItem } from "@/types/cart-type";
import { useUserStore } from "@/stores/user-info-store";
import {
  usePaymentInitiate,
  useVerifyPaymentInitiate,
} from "@/hooks/payment-hooks";
import { RazorpayOptionsTypes } from "@/types/payment-types";
import { useRouter } from "next/navigation";

export default function PaynowButton({
  cartItems,
  totalAmount,
}: {
  cartItems: CartItem[];
  totalAmount: number;
}) {
  const router = useRouter();

  const { mutate: ordersMutate, isPending: isOrdersPending } =
    useOrdersCreate();
  const { mutate: initiatePaymentMutate, isPending: isPaymentPending } =
    usePaymentInitiate();
  const { mutate: verifyPaymentMutate, isPending: isVerifyPaymentPending } =
    useVerifyPaymentInitiate();
  const { user } = useUserStore();

  const handlePayment = () => {
    // ✅ Safety check to ensure Razorpay script is loaded
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not yet loaded. Please try again in a moment.");
      return;
    }

    // 1️⃣ Create backend order
    ordersMutate(
      {
        customerId: user?._id || "",
        items: cartItems,
        totalAmount,
        shippingAddress: "123 Main St",
      },
      {
        onSuccess: (orderData) => {
          // 2️⃣ Create Razorpay order via backend
          initiatePaymentMutate(
            { orderId: orderData.order._id },
            {
              onSuccess: (res) => {
                const data = res.data;

                // 3️⃣ Configure Razorpay Checkout options
                const options: RazorpayOptionsTypes = {
                  key: data.key,
                  amount: data.amount,
                  currency: data.currency,
                  order_id: data.orderId,
                  name: "Your Store",
                  description: "Order Payment",
                  handler: function (response: any) {
                    // 4️⃣ Verify payment on backend
                    verifyPaymentMutate(response, {
                      onSuccess: () => {
                        router.push("/orders");
                      },

                      onError: () => alert("❌ Payment verification failed!"),
                    });
                  },
                  prefill: {
                    name: user?.name || "Guest User",
                    email: user?.email || "guest@example.com",
                  },
                  theme: { color: "#0E7490" },
                };

                // 5️⃣ Open Razorpay checkout window
                const rzp = new window.Razorpay(options);
                rzp.open();
              },
              onError: (err) => {
                console.error(err);
                alert("❌ Failed to initiate payment");
              },
            }
          );
        },
        onError: (err) => {
          console.error(err);
          alert("❌ Failed to create order");
        },
      }
    );
  };

  return (
    <div className="p-10">
      <Button
        disabled={isOrdersPending || isPaymentPending || isVerifyPaymentPending}
        onClick={handlePayment}
      >
        {isOrdersPending || isPaymentPending || isVerifyPaymentPending
          ? "Processing..."
          : "Pay Now"}
      </Button>
    </div>
  );
}

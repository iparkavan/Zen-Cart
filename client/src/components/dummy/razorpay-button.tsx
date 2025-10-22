// components/CheckoutButton.tsx
"use client";

import React from "react";

interface CheckoutButtonProps {
  orderId: string;
  userId: string;
  amount: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  orderId,
  userId,
  amount,
}) => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create Razorpay order on backend
      const res = await fetch("http://localhost:5000/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, userId, amount, method: "CARD" }),
      });
      const data = await res.json();

      if (!data.success) {
        alert("Failed to create payment order");
        return;
      }

      const { razorpayOrderId, amount: payAmount, key } = data.data;

      // 2️⃣ Open Razorpay checkout
      const options: any = {
        key,
        amount: payAmount,
        currency: "INR",
        name: "My E-Commerce",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          // 3️⃣ Verify payment signature
          const verifyRes = await fetch(
            "http://localhost:5000/api/payments/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("✅ Payment Successful!");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default CheckoutButton;

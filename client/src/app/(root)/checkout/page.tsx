"use client";

import PaynowButton from "@/components/dummy/Paynow-button";
import { useGetAllCartItems } from "@/hooks/cart-hooks";
import { useOrderStore } from "@/stores/order-store";
import React from "react";

const page = () => {
  const { data } = useGetAllCartItems();
  const { orderSummary } = useOrderStore();

  return (
    <div>
      <PaynowButton
        cartItems={data?.cartItems || []}
        totalAmount={orderSummary?.total || 0}
      />
    </div>
  );
};

export default page;

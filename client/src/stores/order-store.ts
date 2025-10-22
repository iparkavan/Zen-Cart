import { UserInfo } from "@/types/user-info-types";
import { create } from "zustand";

interface IOrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
// Zustand store state
interface UserState {
  orderSummary: IOrderSummary | null;
  setOrderSummary: (orderSummary: IOrderSummary) => void;
}

export const useOrderStore = create<UserState>((set) => ({
  orderSummary: null,
  setOrderSummary: (orderSummary: IOrderSummary) => set({ orderSummary }),
}));

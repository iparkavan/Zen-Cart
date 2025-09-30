import { UserInfo } from "@/types/user-info-types";
import { create } from "zustand";

// Zustand store state
interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<UserInfo>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (updates) =>
    set((state) =>
      state.user ? { user: { ...state.user, ...updates } } : state
    ),
}));

// stores/guest-cart-store.ts
import { CartItem } from "@/types/cart-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuestCartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clear: () => void;
}

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i._id === item._id);

        if (existing) {
          existing.quantity += quantity;
          set({ items: [...items] });
        } else {
          set({ items: [...items, { ...item, quantity }] });
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i._id !== productId) }),

      clear: () => set({ items: [] }),

      incrementItem: (productId) => {
        const items = get().items.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ items });
      },

      decrementItem: (productId) => {
        const items = get()
          .items.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
        set({ items });
      },
    }),
    { name: "guest-cart" } // saves in localStorage
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface Items {
//   productId: string;
//   quantity: number;
// }

// interface CartState {
//   items: Items[];
//   addItem: (item: Items) => void;
//   removeItem: (productId: string) => void;
//   incrementCartItem: (productId: string) => void;
//   decrementCartItem: (productId: string) => void;
// }

// export const useCartInfoStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],

//       addItem: (item) =>
//         set((state) => {
//           const exists = state.items.find(
//             (i) => i.productId === item.productId
//           );

//           if (exists) {
//             return {
//               items: state.items.map((i) =>
//                 i.productId === item.productId
//                   ? { ...i, quantity: item.quantity }
//                   : i
//               ),
//             };
//           }

//           return { items: [...state.items, item] };
//         }),

//       removeItem: (productId) => {
//         set((state) => {
//           return {
//             items: state.items.filter((i) => i.productId !== productId),
//           };
//         });
//       },

//       incrementCartItem: (productId) => {
//         set((state) => ({
//           items: state.items.map((i) =>
//             i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
//           ),
//         }));
//       },

//       decrementCartItem: (productId) => {
//         set((state) => ({
//           items: state.items
//             .map((i) =>
//               i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
//             )
//             .filter((i) => i.quantity > 0),
//         }));
//       },
//     }),
//     {
//       name: "guest-cart", // unique name for localStorage
//     }
//   )
// );

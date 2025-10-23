import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addItem: (product, rentalDays = 3) => {
        const { items } = get();
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          // If item exists, increase quantity
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          set({
            items: [...items, { ...product, quantity: 1, rentalDays }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item._id !== productId),
        });
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrementQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item._id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Getters
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotal: (discount = 0, shipping = 0) => {
        const subtotal = get().getSubtotal();
        return subtotal - discount + shipping;
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

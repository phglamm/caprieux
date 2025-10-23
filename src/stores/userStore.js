import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,

      // Actions
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set({
          user: { ...get().user, ...userData },
        });
      },

      // Getters
      getUser: () => get().user,
      isLoggedIn: () => get().isAuthenticated,
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);

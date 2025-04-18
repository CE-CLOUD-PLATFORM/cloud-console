/* eslint-disable no-unused-vars */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@/modules/auth/types/user";
import { getCookie } from "cookies-next";
import { cookieParser } from "@/shared/utils/cookie-parser";
import { removeSession } from "@/shared/utils";
type UserState = {
  user: User | null;
  admin:boolean;
  loading: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setAdmin: (admin: boolean) => void;
    setLoading: (loading: boolean) => void;
    logoutUser: () => void,
    initializeUser: () => void
  };
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    loading: true,
    admin: false,
    actions: {
      setUser: (user) => set({ user }),
      setAdmin: (admin) => set({ admin }),
      setLoading: (loading) => set({ loading }),
      logoutUser: () => {
        removeSession()
        set({ user: null, loading: false });
      },
      initializeUser: () => {
        const user = getCookie("user");
        const token = getCookie("token");

        if (user && token) {
          set({
            user: {
              token,
              info: cookieParser(user)
            }, loading: false
          });
        } else {
          removeSession()
          set({ user: null, loading: false });
        }
      }
    },

  }))
);

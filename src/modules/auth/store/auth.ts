
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User, UserInfo } from "@/modules/auth/types/user";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { cookieParser } from "@/shared/utils/cookie-parser";
import { removeSession } from "@/shared/utils";
type UserState = {
  user: User | null;
  loading: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    logoutUser: () => void,
    initializeUser: () => void
  };
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    loading: true,
    actions: {
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      logoutUser: () => set({ user: null }),
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
          set({ user: null, loading: false });
          removeSession()
        }
      }
    },

  }))
);

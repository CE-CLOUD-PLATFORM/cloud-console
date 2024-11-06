import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@/modules/auth/types/user";

type UserState = {
  user: User | null;
  loading: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
  };
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    loading: true,
    actions: {
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
    },
  }))
);

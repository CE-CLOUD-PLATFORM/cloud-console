import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store/auth";
import type { ILoginReq } from "@/shared/interfaces/login";
import { authUser } from "@/modules/auth/service";
import type { User } from "@/modules/auth/types/user";
export const useAuth = () => {
  const { setUser } = useUserStore((state) => state.actions);
  return useMutation({
    mutationFn: (loginRequest: ILoginReq) => authUser(loginRequest),
    onSuccess: (res) => {
      const user: User = { info: res.user, token: res.token };
      setUser(user);
    },
    onError: (error) => error,
  });
};

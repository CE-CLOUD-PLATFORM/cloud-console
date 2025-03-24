import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useUserStore } from '../store/auth';

import { authUser } from '@/modules/auth/service';
import type { User } from '@/modules/auth/types/user';
import { IAuthLogin, IAuthLoginRes } from '../types/auth';
export const useAuth = (options?:MutationOptions<IAuthLoginRes,Error,IAuthLogin>) => {
  const { setUser } = useUserStore((state) => state.actions);
  return useMutation({
    ...options,
    mutationFn: authUser,
    onSuccess: (res) => {
      const user: User = { info: res.user, token: res.token };
      setUser(user);
    },
    onError: (error) => error,
  });
};

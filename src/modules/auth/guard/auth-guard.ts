/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, type PropsWithChildren } from 'react';
import { useUserStore } from '@/modules/auth/store/auth';
import { useValidateToken } from '../hook/use-validate-token';

export function AuthGuard({ children }: PropsWithChildren) {

  const router = useRouter();
  const initializeUser = useUserStore((state) => state.actions.initializeUser)
  const user = useUserStore((state) => state.user);
  const setAdmin = useUserStore((state) => state.actions.setAdmin);
  const loading = useUserStore((state) => state.loading);
  const validator = useValidateToken({ token: user?.token })
  const logoutUser = useUserStore((state) => state.actions.logoutUser)

  const validateAuthentication = useCallback(async () => {

    if (loading) {

      initializeUser()
      return;
    }
    if (validator.isLoading) {
      return
    }

    if (!!validator.data) {
      if (validator.data.code !== 200) {
        logoutUser()
        return
      }
      setAdmin(validator.data.admin)
    }
    if (!user) {
      router.replace('/auth/signin');
      return;
    }
  }, [loading, user, router, validator]);

  useEffect(() => {
    validateAuthentication();
  }, [validateAuthentication]);

  return children;
}

export function AlreadyAuthenticatedGuard({ children }: PropsWithChildren) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const checkAlreadyAuthenticated = useCallback(() => {
    if (loading) {
      return;
    }

    if (user) {

      router.replace('/');
      return;
    }
  }, [loading, user, router]);

  useEffect(() => {

    checkAlreadyAuthenticated();
  }, [checkAlreadyAuthenticated]);

  return children;
}

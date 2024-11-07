'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, type PropsWithChildren } from 'react';
import { useUserStore } from '@/modules/auth/store/auth';

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const validateAuthentication = useCallback(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/auth/signin');
      return;
    } else {
      router.replace('/subject_management');
    }
  }, [loading, user, router]);

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

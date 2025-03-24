import { Suspense, type PropsWithChildren } from 'react';
import { AlreadyAuthenticatedGuard } from '@/modules/auth/guard/auth-guard';

export default function Layout({ children }: PropsWithChildren) {
  
  return (
    <Suspense>
      <AlreadyAuthenticatedGuard>
        {children}
      </AlreadyAuthenticatedGuard>
    </Suspense>
  );
}

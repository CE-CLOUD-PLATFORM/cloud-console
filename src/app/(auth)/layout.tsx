import { Suspense, type PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { AlreadyAuthenticatedGuard } from '@/modules/auth/guard/auth-guard';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <AlreadyAuthenticatedGuard>
        <Toaster />
        {children}
      </AlreadyAuthenticatedGuard>
    </Suspense>
  );
}

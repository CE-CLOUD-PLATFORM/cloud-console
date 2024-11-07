import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import Navbar from '@/shared/components/Navbar';
import { Suspense, type PropsWithChildren } from 'react';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AuthGuard>
        <Navbar />
        {children}
      </AuthGuard>
    </Suspense>
  );
}

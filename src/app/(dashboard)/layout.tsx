import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import Navbar from '@/shared/components/Navbar';
import { Suspense } from 'react';
import Loading from './loading';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthGuard>
        <Navbar />
        {children}
      </AuthGuard>
    </Suspense>
  );
}

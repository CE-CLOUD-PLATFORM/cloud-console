import { Suspense } from 'react';
import Loading from '@/shared/components/Loading/CircleLoading';
import { Layout as DashboaedLayout } from '@/shared/layouts/dashboard/index';
import { AuthGuard } from '@/modules/auth/guard/auth-guard';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Suspense fallback={<Loading />}>
        <DashboaedLayout>{children}</DashboaedLayout>
      </Suspense>
    </AuthGuard>
  );
}

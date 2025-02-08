
import { Suspense } from 'react';
import Loading from '@/shared/components/Loading/CircleLoading';
import { Layout as DashboaedLayout } from '@/shared/layouts/dashboard/index';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <DashboaedLayout>{children}</DashboaedLayout>
    </Suspense>
  );
}

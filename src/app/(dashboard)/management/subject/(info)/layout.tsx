import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import Sidebar from '@/shared/components/Sidebar';
import { Suspense, type PropsWithChildren } from 'react';
import Loading from './loading';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthGuard>
        <div className="flex">
          <Sidebar />
          <div className="w-full p-10">{children}</div>
        </div>
      </AuthGuard>
    </Suspense>
  );
}

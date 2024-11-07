import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import Navbar from '@/shared/components/Navbar';
import Sidebar from '@/shared/components/Sidebar';
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
        <div className="flex">
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </AuthGuard>
    </Suspense>
  );
}

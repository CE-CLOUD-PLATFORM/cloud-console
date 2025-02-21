import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import Sidebar from '@/shared/components/Sidebar';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex">
        <Sidebar />
        <div className="w-full p-10">{children}</div>
      </div>
  );
}

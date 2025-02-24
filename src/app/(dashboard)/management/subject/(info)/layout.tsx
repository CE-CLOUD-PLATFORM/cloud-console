import { AuthGuard } from '@/modules/auth/guard/auth-guard';
import SidebarSubject from '@/shared/components/subject/sidebar';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div  className="flex h-full">
        <SidebarSubject />
        <div className="w-full h-full overflow-y-scroll">{children}</div>
      </div>
  );
}

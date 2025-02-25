import SidebarGroup from '@/shared/components/sidebar/groups-sidebar';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div  className="flex h-full">
        <SidebarGroup />
        <div className="w-full h-full overflow-y-scroll">{children}</div>
      </div>
  );
}

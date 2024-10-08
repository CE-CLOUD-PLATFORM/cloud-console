import InstanceMenu from "@/components/Sidemenu/InstanceMenu";
export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <InstanceMenu />
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

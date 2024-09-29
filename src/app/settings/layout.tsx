import SettingsMenu from "@/components/Sidemenu/SettingMenu";

export default function InstanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <SettingsMenu />
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

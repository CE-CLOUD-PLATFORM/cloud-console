import InstanceMenu from "@/components/Sidemenu/InstanceMenu";
import SettingMenu from "@/components/Sidemenu/SettingMenu";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      {children}
    </div>
  );
}


import SubjectsMenu from "@/components/Sidemenu/SubjectsMenu";

export default function InstanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <SubjectsMenu />
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

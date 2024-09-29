import SubjectMenu from "@/components/Sidemenu/SubjectMenu";

export default function SubjectLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <SubjectMenu />
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

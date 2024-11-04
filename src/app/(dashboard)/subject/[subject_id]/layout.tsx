import SubjectMenu from "@/components/Sidemenu/SubjectMenu";

export default function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subject_id: string };
}) {
  return (
    <div className="w-full flex">
      <SubjectMenu subject_id={params.subject_id}/>
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

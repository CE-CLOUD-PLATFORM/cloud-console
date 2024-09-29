"use client;"
export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <div className="side-menu"></div>
      {children}
      <div className="side-menu"></div>
    </div>
  );
}

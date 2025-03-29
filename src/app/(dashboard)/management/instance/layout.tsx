export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <div className="h-full w-full overflow-y-scroll">{children}</div>
    </div>
  );
}

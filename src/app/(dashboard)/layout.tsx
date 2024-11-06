import { AuthGuard } from '@/modules/auth/guard/auth-guard';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}

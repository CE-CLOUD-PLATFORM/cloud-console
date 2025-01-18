import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import { ReactQueryProvider } from '@/shared/react-query/react-query-provider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'CE CLOUD CONSOLE',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100">
        <Toaster />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

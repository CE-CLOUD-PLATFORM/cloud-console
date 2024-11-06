import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import { ReactQueryProvider } from '@/shared/react-query/react-query-provider';

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
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

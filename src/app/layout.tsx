import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import { ReactQueryProvider } from '@/shared/react-query/react-query-provider';
import { Toaster } from 'react-hot-toast';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@/shared/theme/theme-provider';

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
    <html
      className="h-screen overflow-y-hidden"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/assets/ce-logo.png" sizes="any" />
      </head>
      <body className="flex h-full flex-col bg-slate-100">
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  className: 'mt-5',
                  duration: 1800,
                }}
                key={'toast'}
              />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import AuthProviders from '@/providers/auth-provider';
import QueryProvider from '@/providers/query-provider';

import { NotificationProvider } from '@/providers/notification-provider';
import ProgressBarProvider from '@/providers/ProgressBarProvider';
const roboto_condensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'ViewTube',
  description: 'Upload your video',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProviders>
        <QueryProvider>
          <body className={roboto_condensed.className}>
            <ProgressBarProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </ProgressBarProvider>
          </body>
        </QueryProvider>
      </AuthProviders>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes app with Next.js App Router, React Query, SSR/CSR',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />

          <div id="page-root">{children}</div>

          <Footer />

          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}

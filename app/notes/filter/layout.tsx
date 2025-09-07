import type { ReactNode } from 'react';
import css from '@/LayoutNotes.module.css';

export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}

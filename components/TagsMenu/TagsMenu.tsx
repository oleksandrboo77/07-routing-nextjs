'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className={css.menuContainer} ref={ref}>
      <button
        type="button"
        className={css.menuButton}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
      >
        Notes ▾
      </button>

      <ul className={`${css.menuList} ${open ? css.open : ''}`} role="menu">
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem} role="none">
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              role="menuitem"
              prefetch={false}
              onClick={() => setOpen(false)}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

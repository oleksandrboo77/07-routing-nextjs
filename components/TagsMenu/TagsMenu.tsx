'use client';
import { useState } from 'react';
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

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList} role="menu">
          {TAGS.map((tag) => {
            const href = `/notes/filter/${tag}`;
            return (
              <li key={tag} className={css.menuItem} role="none">
                <Link
                  href={href}
                  className={css.menuLink}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

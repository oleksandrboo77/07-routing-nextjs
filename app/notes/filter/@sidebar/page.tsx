import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => {
        const href = `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

type Params = { slug: string[] | undefined };

function normalizeTag(slug: string[] | undefined): NoteTag | undefined {
  if (!slug || slug.length === 0) return undefined;
  const tag = slug[0];
  if (tag === 'All') return undefined;
  return tag as NoteTag;
}

export default function NotesFilterPage({ params }: { params: Params }) {
  const tag = normalizeTag(params.slug);
  return <NotesClient initialTag={tag} />;
}

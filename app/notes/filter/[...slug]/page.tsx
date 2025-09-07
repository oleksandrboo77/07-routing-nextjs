import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

function parseTag(slug: string[] | string | undefined): NoteTag | undefined {
  if (!slug) return undefined;
  const seg = Array.isArray(slug) ? slug[0] : slug;
  if (seg === 'All') return undefined;

  const allowed: NoteTag[] = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];
  return allowed.includes(seg as NoteTag) ? (seg as NoteTag) : undefined;
}

export default async function NotesFilteredPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const initialTag = parseTag(params?.slug);
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', 1, 12, '', initialTag ?? ''],
    queryFn: ({ signal }) =>
      initialTag
        ? fetchNotes(1, 12, { search: '', tag: initialTag }, signal)
        : fetchNotes(1, 12, { search: '' }, signal),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialTag={initialTag} />
    </HydrationBoundary>
  );
}

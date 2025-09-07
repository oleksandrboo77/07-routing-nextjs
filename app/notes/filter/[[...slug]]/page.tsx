import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

type Params = { slug?: string[] };

function parseTag(slug?: string[]): NoteTag | undefined {
  const raw = slug?.[0];
  if (!raw || raw === 'All') return undefined;
  const allowed: NoteTag[] = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];
  return allowed.includes(raw as NoteTag) ? (raw as NoteTag) : undefined;
}

export default async function NotesFilterPage({ params }: { params: Params }) {
  const tag = parseTag(params.slug);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 10, tag }],
    queryFn: ({ signal }) =>
      fetchNotes(1, 10, tag ? { tag } : undefined, signal),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}

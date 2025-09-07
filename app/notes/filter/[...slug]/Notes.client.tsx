'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import type { FetchNotesResponse } from '@/lib/api';
import css from './NotesPage.module.css';

export default function NotesClient({ initialTag }: { initialTag?: NoteTag }) {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, isPlaceholderData } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', { page, perPage, tag: initialTag, search }],
    queryFn: ({ signal }) =>
      fetchNotes(
        page,
        perPage,
        {
          ...(initialTag ? { tag: initialTag } : {}),
          ...(search ? { search } : {}),
        },
        signal,
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.container}>
      {isLoading && <p className={css.meta}>Loading...</p>}
      {isError && <p className={css.meta}>Failed to load notes</p>}
      {isPlaceholderData && <p className={css.meta}>Updating…</p>}
    </div>
  );
}

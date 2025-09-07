'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import type { FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
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
      <div className={css.toolbar}>
        <SearchBox
          text={search}
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      {isLoading && <p className={css.meta}>Loading...</p>}
      {isError && <p className={css.meta}>Failed to load notes</p>}
      {isPlaceholderData && <p className={css.meta}>Updating…</p>}

      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
}

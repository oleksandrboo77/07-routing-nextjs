'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm'; 
import css from './NotesPage.module.css';

export default function NotesPageClient({ initialTag }: { initialTag?: NoteTag }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSetSearch = useDebouncedCallback((v: string) => {
    setSearchQuery(v.trim());
    setPage(1);
  }, 300);

  const { data, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, perPage, searchQuery, initialTag ?? ''],
    queryFn: ({ signal }) =>
      initialTag ? fetchNotes(page, perPage, { search: searchQuery, tag: initialTag }, signal) : fetchNotes(page, perPage, { search: searchQuery }, signal),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={debouncedSetSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isError && (
        <p>Could not fetch the list of notes. {(error as Error).message}</p>
      )}
      {data &&
        (data.notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          <NoteList notes={data.notes} />
        ))}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

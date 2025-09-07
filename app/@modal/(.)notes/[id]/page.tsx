'use client';

import { useRouter } from 'next/navigation';
import css from '.components/Modal/Modal.module.css';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const onClose = () => router.back();

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <NotePreview id={params.id} />
      </div>
    </div>
  );
}

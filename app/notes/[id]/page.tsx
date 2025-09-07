import NotePreview from '../../../components/NotePreview/NotePreview';

export default function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <NotePreview id={params.id} />;
}

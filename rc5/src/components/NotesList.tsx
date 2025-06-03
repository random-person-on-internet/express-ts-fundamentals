// src/components/NotesList.tsx
import { useQuery } from "@tanstack/react-query";
import useNoteStore from "../stores/noteStore";

async function fetchNotesFromAPI() {
  return Promise.resolve([
    { id: "1", text: "First note" },
    { id: "2", text: "Second note" },
  ]);
}

function NotesList() {
  const setNotes = useNoteStore((s) => s.setNotes);
  const notes = useNoteStore((s) => s.notes);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotesFromAPI,
    onSuccess: setNotes,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading notes</div>;

  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id}>{n.text}</li>
      ))}
    </ul>
  );
}

export default NotesList;

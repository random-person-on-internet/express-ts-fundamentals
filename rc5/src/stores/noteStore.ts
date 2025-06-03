// src/stores/noteStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Note {
  id: string;
  text: string;
}

interface NoteState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
}

const logMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      console.log("Before:", get());
      set(args);
      console.log("After:", get());
    },
    get,
    api
  );

const useNoteStore = create<NoteState>()(
  devtools(
    immer(
      logMiddleware((set) => ({
        notes: [],
        addNote: (note) =>
          set((state) => {
            state.notes.push(note);
          }),
        updateNote: (id, text) =>
          set((state) => {
            const note = state.notes.find((n) => n.id === id);
            if (note) note.text = text;
          }),
        deleteNote: (id) =>
          set((state) => {
            state.notes = state.notes.filter((n) => n.id !== id);
          }),
        setNotes: (notes) =>
          set((state) => {
            state.notes = notes;
          }),
      }))
    )
  )
);

export default useNoteStore;

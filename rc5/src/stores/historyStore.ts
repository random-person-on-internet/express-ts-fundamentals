// src/stores/historyStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

interface HistoryEntry {
  noteId: string;
  action: string;
  timestamp: number;
}

interface HistoryState {
  history: HistoryEntry[];
  addHistoryEntry: (entry: Omit<HistoryEntry, "timestamp">) => void;
  clearHistory: () => void;
}

const useHistoryStore = create<HistoryState>()(
  devtools(
    immer((set) => ({
      history: [],
      addHistoryEntry: (entry) =>
        set((state) => {
          state.history.push({ ...entry, timestamp: Date.now() });
        }),
      clearHistory: () =>
        set((state) => {
          state.history = [];
        }),
    }))
  )
);

export default useHistoryStore;

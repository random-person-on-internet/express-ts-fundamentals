// src/stores/preferencesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PreferencesState {
  theme: "light" | "dark";
  fontSize: number;
  setTheme: (theme: "light" | "dark") => void;
  setFontSize: (size: number) => void;
}

const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "light",
      fontSize: 14,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: "collabnotes-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme, fontSize: state.fontSize }),
      version: 2,
      migrate: (persisted, version) => {
        if (version < 2) return { ...persisted, fontSize: 14 };
        return persisted;
      },
    }
  )
);

export default usePreferencesStore;

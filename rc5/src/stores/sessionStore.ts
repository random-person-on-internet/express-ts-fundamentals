// src/stores/sessionStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SessionState {
  userId: string | null;
  token: string | null;
  expiresAt: number | null;
  role: "admin" | "user";
  setSession: (session: Partial<SessionState>) => void;
  clearSession: () => void;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      expiresAt: null,
      role: "user",
      setSession: (session) => set(session),
      clearSession: () =>
        set({ userId: null, token: null, expiresAt: null, role: "user" }),
    }),
    {
      name: "collabnotes-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userId: state.userId, token: state.token }),
      version: 2,
      migrate: (persisted, version) => {
        if (version < 2) {
          return { ...persisted, role: "user" };
        }
        return persisted;
      },
    }
  )
);

export default useSessionStore;

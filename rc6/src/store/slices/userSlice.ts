export interface UserSlice {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string }) => void;
  clearUser: () => void;
}

export const createUserSlice = (set): UserSlice => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
});

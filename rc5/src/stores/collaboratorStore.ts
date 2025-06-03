// src/stores/collaboratorsStore.ts
import { create } from "zustand";

interface Collaborator {
  id: string;
  name: string;
}

interface CollaboratorsState {
  collaborators: Collaborator[];
  setCollaborators: (list: Collaborator[]) => void;
}

const useCollaboratorsStore = create<CollaboratorsState>((set) => ({
  collaborators: [],
  setCollaborators: (collaborators) => set({ collaborators }),
}));

export default useCollaboratorsStore;

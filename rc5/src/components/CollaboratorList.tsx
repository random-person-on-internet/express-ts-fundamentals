// src/components/CollaboratorsList.tsx
import { useQuery } from "@tanstack/react-query";
import useCollaboratorsStore from "../stores/collaboratorStore";

async function fetchCollaborators() {
  return Promise.resolve([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ]);
}

function CollaboratorsList() {
  const setCollaborators = useCollaboratorsStore((s) => s.setCollaborators);
  const collaborators = useCollaboratorsStore((s) => s.collaborators);

  useQuery({
    queryKey: ["collaborators"],
    queryFn: fetchCollaborators,
    onSuccess: setCollaborators,
  });

  return (
    <ul>
      {collaborators.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}

export default CollaboratorsList;

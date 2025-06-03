import { useDesignHubStore } from "../store";

export function FileList() {
  const files = useDesignHubStore((s) => s.files);
  const addFile = useDesignHubStore((s) => s.addFile);
  const updateFile = useDesignHubStore((s) => s.updateFile);

  return (
    <div>
      <button
        onClick={() =>
          addFile({ id: Date.now().toString(), name: "New File", content: "" })
        }
      >
        Add File
      </button>
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.name}
            <button onClick={() => updateFile(f.id, f.content + " (updated)")}>
              Update Content
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

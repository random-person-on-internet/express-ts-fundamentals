import { useDesignHubStore } from "../store";

export function CommentsPanel({ fileId }: { fileId: string }) {
  const comments = useDesignHubStore((s) => s.getCommentsByFile(fileId));
  const addComment = useDesignHubStore((s) => s.addComment);

  return (
    <div>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.author}: {c.text}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addComment({
            id: Date.now().toString(),
            fileId,
            author: "Ved",
            text: "Hello!",
          })
        }
      >
        Add Comment
      </button>
    </div>
  );
}

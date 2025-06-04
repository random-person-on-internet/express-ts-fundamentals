import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id?: number;
  title: string;
  body: string;
};

export default function AddPost() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: async (newPost: Post) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("Failed to add post");
      return res.json();
    },
    // optimistic update
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData<Post[]>(["posts"], (old = []) => [
        { id: Date.now(), ...newPost },
        ...old,
      ]);

      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["posts"] });
    // },
    onSuccess: (data) => {
      queryClient.setQueryData<Post[]>(["posts"], (old = []) => [data, ...old]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    mutation.mutate({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", width: "300px", marginBottom: "0.5rem" }}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ display: "block", width: "300px", height: "100px" }}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Post"}
      </button>

      {mutation.isError && (
        <p style={{ color: "red" }}>
          Error: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>✅ Post added (optimistically)!</p>}
    </form>
  );
}

import { useQuery } from "@tanstack/react-query";

export default function PostList() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

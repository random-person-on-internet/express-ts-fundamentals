import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddPost from "./hooks/post/AddPost";
import PostList from "./hooks/post/PostList";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>React Query Post Manager</h1>
      <AddPost />
      <PostList />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

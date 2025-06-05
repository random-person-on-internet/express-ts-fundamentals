import { useCallback, useState } from "react";
import TagInput from "./components/TagInput";
import TagList from "./components/TagList";
import AnalyticsChart from "./components/AnalyticsChart";
import CommentsPanel from "./components/CommentsPanel";
import VideoOverlay from "./components/VideoOverlay";

export default function App() {
  const [tags, setTags] = useState<string[]>(["react", "vite", "typescript"]);
  const [filter, setFilter] = useState("");
  const [counter, setCounter] = useState(0); // for unrelated state

  const handleAddTag = useCallback((tag: string) => {
    setTags((prev) => [...prev, tag]);
  }, []);

  return (
    <>
      <h1>Memoization</h1>

      <button onClick={() => setCounter((c) => c + 1)}>
        Increment Counter: {counter}
      </button>

      <hr />

      <TagInput onAddTag={handleAddTag} />
      <input
        placeholder="Filter tags"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TagList tags={tags} filter={filter} />

      <hr />
      <AnalyticsChart data={[{ value: 10 }, { value: 20 }]} />
      <CommentsPanel
        comments={[
          {
            id: "1",
            text: "Nice!!!",
          },
          {
            id: "2",
            text: "Eww!",
          },
        ]}
      />
      <VideoOverlay
        overlays={[
          {
            id: "1",
            label: "Play",
          },
          {
            id: "2",
            label: "Pause",
          },
        ]}
      />
    </>
  );
}

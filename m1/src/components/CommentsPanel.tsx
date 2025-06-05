import React, { useCallback, useMemo, useState } from "react";

type Comment = { id: string; text: string };

const FilterInput = React.memo(
  ({ onFilter }: { onFilter: (val: string) => void }) => {
    return (
      <input
        onChange={(e) => onFilter(e.target.value)}
        placeholder="Filter comments..."
      />
    );
  }
);

const CommentsPanel: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const [filter, setFilter] = useState("");
  const filtered = useMemo(
    () => comments.filter((c) => c.text.includes(filter)),
    [comments, filter]
  );

  const handleFilter = useCallback(setFilter, []);

  return (
    <div>
      <FilterInput onFilter={handleFilter} />
      <ul>
        {filtered.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPanel;

import React, { useState } from "react";

type TagInputProps = {
  onAddTag: (tag: string) => void;
};

const TagInput: React.FC<TagInputProps> = React.memo(({ onAddTag }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAddTag(input);
      setInput("");
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add tag"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
});

export default TagInput;

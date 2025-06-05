import React, { useState } from "react";

interface Props {
  onPost: (value: string) => void;
}

export const CommentBox: React.FC<Props> = ({ onPost }) => {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (text.trim()) {
      onPost(text);
      setText("");
    }
  };

  return (
    <div>
      <input
        data-testid="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

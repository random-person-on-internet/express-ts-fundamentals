import React, { useMemo } from "react";

type TagListProps = {
  tags: string[];
  filter: string;
};

const TagList: React.FC<TagListProps> = React.memo(({ tags, filter }) => {
  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.includes(filter));
  }, [tags, filter]);

  return (
    <ul>
      {filteredTags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
});

export default TagList;

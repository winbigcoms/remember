import { Tag } from "antd";
import styled from "styled-components";

interface TagBoxProps {
  TagItems: string[];
  onRemoveTag: (e: string) => void;
}

const TagBoxElement = styled.div`
  margin-bottom: 5px;
`;

export const TagBox = (props: TagBoxProps) => {
  const { TagItems, onRemoveTag } = props;

  return (
    <TagBoxElement>
      {TagItems.map((title, idx) => (
        <Tag key={idx} closable onClose={() => onRemoveTag(title)}>
          {title}
        </Tag>
      ))}
    </TagBoxElement>
  );
};

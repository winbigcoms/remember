import { getLocationType } from "src/utill";
import styled from "styled-components";

interface SearchListItemProps {
  x: string;
  y: string;
  place_name: string;
  category_name: string;
  phone: string;
  idx: number;
  selectInList: (x: string, y: string, idx: number) => void;
}

const SearchListItemElement = styled.li`
  margin-bottom: 15px;
  width: 100%;

  & > div {
    line-height: normal;
  }

  & > div:first-child {
    margin-bottom: 3px;
  }
`;

export const SearchListItem = (props: SearchListItemProps) => {
  const { x, y, place_name, category_name, phone, idx, selectInList } = props;

  return (
    <SearchListItemElement onClick={() => selectInList(x, y, idx)}>
      <div>
        {idx + 1}. {place_name}
      </div>
      <div>타입: {getLocationType(category_name)}</div>
      <div>연락처: {phone}</div>
    </SearchListItemElement>
  );
};

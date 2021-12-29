import styled from "styled-components";

import { SearchContainer } from "../SearchContainer";

interface SearchSuggestSubmenuProps {
  oldLocations: { title: string; location: string; old: number }[];
}

const OldOL = styled.ol`
  list-style: auto;
  font-size: 18px;

  margin-top: 20px !important;
  li {
    margin-bottom: 15px;
    span {
      line-height: normal;
      display: block;
    }
  }
`;

export const SearchSuggestSubmenu = (props: SearchSuggestSubmenuProps) => {
  const { oldLocations } = props;

  return (
    <SearchContainer>
      <h3>이제는 가자!</h3>
      <OldOL>
        {oldLocations.map((data, idx) => (
          <li key={idx}>
            <span>{data.title}</span>
            <span>등록한지 벌써..{data.old}일</span>
          </li>
        ))}
      </OldOL>
    </SearchContainer>
  );
};

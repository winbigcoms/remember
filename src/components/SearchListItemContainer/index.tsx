import { HTMLAttributes } from "react";

import styled from "styled-components";

const SearchListItemContainerElement = styled.div`
  margin-top: 15px;
  border-top: 2px solid #c8cefd;
  padding: 10px 0;
  max-height: calc(100vh - 400px);
  overflow: auto;
  width: 100%;
`;

export const SearchListItemContainer = (props: HTMLAttributes) => {
  const { children } = props;
  return (
    <SearchListItemContainerElement>
      <ul>{children}</ul>
    </SearchListItemContainerElement>
  );
};

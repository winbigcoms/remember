import { HTMLAttributes } from "react";
import styled from "styled-components";

const SearchMapSubmenuElement = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 140px;
  background-color: #fff !important;

  input {
    height: 40px;
    border-radius: 5px;
    font-size: 20px;
    border: 1px solid #c8cefd;
  }
`;

export const SearchContainer = (props: HTMLAttributes) => {
  const { children } = props;

  return <SearchMapSubmenuElement>{children}</SearchMapSubmenuElement>;
};

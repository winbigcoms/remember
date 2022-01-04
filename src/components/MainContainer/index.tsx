import { ReactComponentElement } from "react";
import styled from "styled-components";

const MainContainerElement = styled.div`
  display: flex;
  margin: auto;
  max-width: 100vw;
  min-width: 1440px;

  height: 100vh;

  padding: 5px 0px;
  position: relative;
`;

export const MainContainer = ({ children }) => {
  return <MainContainerElement>{children}</MainContainerElement>;
};

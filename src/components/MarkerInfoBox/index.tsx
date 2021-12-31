import styled from "styled-components";

const MarkerInfoBoxElement = styled.div`
  width: 220px;
  height: 130px;
`;

interface MarkerInfoBoxProps {
  title: string;
  type: string;
}

export const MarkerInfoBox = (props: MarkerInfoBoxProps) => {
  const { title } = props;
  return <MarkerInfoBoxElement>{title}</MarkerInfoBoxElement>;
};

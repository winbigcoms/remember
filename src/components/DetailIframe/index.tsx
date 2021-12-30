import styled from "styled-components";

const DetailIframeElement = styled.iframe`
  & > body {
    width: 800px;
  }
`;

interface DetailIframeProps {
  src: string;
}

export const DetailIframe = (props: DetailIframeProps) => {
  const { src } = props;

  return <DetailIframeElement src={src} width={940} height={650} />;
};

import styled from "styled-components";
import { SubmitButton } from "src/components";

const DetailIFrameContainer = styled.div`
  position: relative;

  & > div {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 67px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;

    & > button {
      margin: 0;
    }
  }
`;

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

  return (
    <DetailIFrameContainer>
      <div>
        <SubmitButton text="내 장소에 저장하기" />
      </div>
      {src !== "" && <DetailIframeElement src={src} width={940} height={650} />}
    </DetailIFrameContainer>
  );
};

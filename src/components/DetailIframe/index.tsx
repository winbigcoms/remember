import styled from "styled-components";
import { SubmitButton } from "src/components";
import { SearchResult } from "src/types/searchResultType";
import { useEffect, useRef, useState } from "react";
import { AddLocationForm } from "../AddLocationForm";

const DetailIFrameContainer = styled.div`
  position: relative;
  width: 940px;
  height: 656px;

  & > div:first-child {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 67px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;

    & > button {
      margin: 0;
    }
    & > div {
      height: 40px;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
  }
`;

const DetailIframeElement = styled.iframe`
  & > body {
    width: 800px;
  }
`;

type ShowType = "site" | "save";

interface DetailIframeProps {
  detailPage: SearchResult;
}

export const DetailIframe = (props: DetailIframeProps) => {
  const { detailPage } = props;

  const [showState, setShowState] = useState<ShowType>("site");
  const [isLoading, setLoading] = useState(true);

  const iframeRef = useRef(null);

  const onChangeShowState = () => {
    setShowState((state) => (state === "site" ? "save" : "site"));
  };

  const onLoadingFinish = () => {
    setLoading(false);
  };

  useEffect(() => {
    setShowState("site");
    setLoading(true);

    iframeRef.current.addEventListener("load", onLoadingFinish);
  }, [detailPage]);

  return (
    <DetailIFrameContainer>
      <div>
        <div>장소에 가보고 싶다면?</div>
        <SubmitButton
          text={showState === "site" ? "내 장소에 저장하기" : "상세정보 보기"}
          onSubmit={onChangeShowState}
        />
      </div>
      {showState === "site" ? (
        detailPage.place_url !== "" && (
          <DetailIframeElement
            ref={iframeRef}
            src={detailPage.place_url}
            isLoading={isLoading}
            style={{
              display: isLoading ? "none" : "block",
            }}
            width={940}
            height={650}
          />
        )
      ) : (
        <AddLocationForm detailPage={detailPage} />
      )}
    </DetailIFrameContainer>
  );
};

import React, { MutableRefObject, useEffect } from "react";
import MapContainer from "./MapContainer";

interface KakaoMapProps {
  kakaoMapObject: MutableRefObject<HTMLDivElement>;
}

export const KakaoMap = (props: KakaoMapProps) => {
  const { kakaoMapObject } = props;

  return <MapContainer ref={kakaoMapObject} />;
};

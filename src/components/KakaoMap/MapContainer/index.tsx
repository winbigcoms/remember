import React, { forwardRef, Ref } from "react";
import styled from "styled-components";

type MapContainerProps = {
  ref: Ref<HTMLDivElement>;
};

const MapContainerElement = styled.div`
  width: calc(100% - 355px);
`;

const MapContainer: React.FC<MapContainerProps> = forwardRef((props, ref) => {
  return (
    <MapContainerElement>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
    </MapContainerElement>
  );
});

MapContainer.displayName = "KakaoMap";

export default MapContainer;

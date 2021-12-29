import { useCallback, useEffect, useRef, useState } from "react";

interface useKakaoMapProps {
  setSearchData: (data: any[]) => void;
  searchData: any[];
}

export const useKakaoMap = (props: useKakaoMapProps) => {
  const { setSearchData, searchData } = props;

  // const [markers, setMarker] = useState([]);
  const markers = useRef([]);
  const kakaoMap = useRef<HTMLDivElement>(null);
  const mapObject = useRef(null);
  const kakaoMapSearch = useRef(null);

  const addMarker = useCallback((position, idx) => {
    console.log(position);
    var marker = new kakao.maps.Marker({
      // map: mapObject.current,
      position: new kakao.maps.LatLng(position.La, position.Ma),
    });

    marker.setMap(mapObject.current);

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
    // const imageSrc =
    //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다

    // const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    // const imgOptions = {
    //   spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //   spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //   offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    // };
    // const markerImage = new kakao.maps.MarkerImage(
    //   imageSrc,
    //   imageSize,
    //   imgOptions
    // );
    // const marker = new kakao.maps.Marker({
    //   position, // 마커의 위치
    //   image: markerImage,
    // });

    // marker.setMap(mapObject.current); // 지도 위에 마커를 표출합니다
    // markers.current.push(marker); // 배열에 생성된 마커를 추가합니다
  }, []);

  const removeMarker = useCallback(() => {
    for (var i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
    }
    markers.current = [];
  }, []);

  useEffect(() => {
    if (kakaoMap && kakaoMap.current) {
      const x = 126.914454;
      const y = 37.549913;

      const initCenter = new (window as any).kakao.maps.LatLng(y, x);

      const options = {
        center: initCenter,
        level: 2,
      };

      mapObject.current = new (window as any).kakao.maps.Map(
        kakaoMap.current,
        options
      );

      const marker = new (window as any).kakao.maps.Marker({
        position: initCenter,
        map: mapObject.current,
      });

      mapObject.current.relayout();
      mapObject.current.setCenter(initCenter);

      marker.setPosition(initCenter);

      const zoomControl = new (window as any).kakao.maps.ZoomControl();

      mapObject.current.addControl(
        zoomControl,
        (window as any).kakao.maps.ControlPosition.BOTTOMRIGHT
      );

      kakaoMapSearch.current = new (window as any).kakao.maps.services.Places();
    }
  }, []);

  useEffect(() => {
    if (mapObject.current && searchData.length !== 0) {
      console.log(mapObject.current);
      const bounds = new (window as any).kakao.maps.LatLngBounds();

      if (markers.current.length !== 0) {
        removeMarker();
      }

      for (let i = 0; i < searchData.length; i++) {
        var placePosition = new (window as any).kakao.maps.LatLng(
          searchData[i].y,
          searchData[i].x
        );
        const marker = addMarker(placePosition, i);

        bounds.extend(placePosition);
      }
    }
  }, [addMarker, removeMarker, searchData]);

  const searchLocation = useCallback(
    (keyword: string) => {
      if (kakaoMapSearch.current) {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            console.log(data);

            setSearchData(data);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        kakaoMapSearch.current.keywordSearch(keyword, placesSearchCB);
      }
    },
    [setSearchData]
  );

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    }
  }

  function displayMarker(place) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });
  }

  return { kakaoMap, searchLocation };
};

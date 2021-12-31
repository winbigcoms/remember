import { useCallback, useEffect, useRef, useState } from "react";
import {
  SearchResult,
  SearchResultPagination,
} from "src/types/searchResultType";

interface useKakaoMapProps {
  setSearchData: (data: any[]) => void;
  searchData: SearchResult[];
  onSearchLocationDetail: (url: string) => void;
}

export const useKakaoMap = (props: useKakaoMapProps) => {
  const { setSearchData, searchData, onSearchLocationDetail } = props;

  const markers = useRef(null);
  const infoWindows = useRef([]);
  const kakaoMap = useRef<HTMLDivElement>(null);
  const mapObject = useRef(null);
  const paginationObject = useRef<null | SearchResultPagination>(null);
  const kakaoMapSearch = useRef(null);

  useEffect(() => {
    if (kakaoMap && kakaoMap.current) {
      if (searchData.length === 0) {
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

        kakao.maps.event.addListener(
          mapObject.current,
          "click",
          function (mouseEvent) {
            console.log(mouseEvent);
            // 클릭한 위도, 경도 정보를 가져옵니다
            // var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            // marker.setPosition(latlng);

            // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';

            // var resultDiv = document.getElementById('clickLatlng');
            // resultDiv.innerHTML = message;
          }
        );

        const marker = new (window as any).kakao.maps.Marker({
          position: initCenter,
          map: mapObject.current,
        });

        mapObject.current.relayout();
        mapObject.current.setCenter(initCenter);

        marker.setPosition(initCenter);

        markers.current = [marker];

        const zoomControl = new (window as any).kakao.maps.ZoomControl();

        mapObject.current.addControl(
          zoomControl,
          (window as any).kakao.maps.ControlPosition.BOTTOMRIGHT
        );

        kakaoMapSearch.current = new (
          window as any
        ).kakao.maps.services.Places();
      } else {
        const x = searchData[0].x;
        const y = searchData[0].y;

        markers.current.forEach((mark) => {
          mark.setMap(null);
        });

        infoWindows.current = [];

        const initCenter = new (window as any).kakao.maps.LatLng(y, x);
        let bounds = new kakao.maps.LatLngBounds();

        const options = {
          center: initCenter,
        };

        let markerBucket = [];

        for (let i = 0; i < searchData.length; i++) {
          const position = new (window as any).kakao.maps.LatLng(
            searchData[i].y,
            searchData[i].x
          );

          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          const imageSize = new kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, i * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };

          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );

          const marker = new (window as any).kakao.maps.Marker({
            position: initCenter,
            map: mapObject.current,
            image: markerImage,
          });

          const iwContent = `
            <div style="position:relative;padding:5px;">
              ${searchData[i].place_name}
            </div>
          `;

          const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: true,
          });

          infoWindows.current.push(infowindow);

          kakao.maps.event.addListener(marker, "click", function (e) {
            console.log(e);

            const initCenter = new (window as any).kakao.maps.LatLng(
              searchData[i].y,
              searchData[i].x
            );

            mapObject.current.setCenter(initCenter);

            infoWindows.current.forEach((infoWindowObject) =>
              infoWindowObject.close()
            );

            mapObject.current.setLevel(2);
            // 마커 위에 인포윈도우를 표시합니다
            if (searchData[i].place_url) {
              onSearchLocationDetail(searchData[i].place_url);
              infowindow.open(mapObject.current, marker);
            }
          });

          markerBucket.push(marker);

          bounds.extend(position);

          marker.setPosition(position);
        }

        markers.current = markerBucket;

        mapObject.current.setBounds(bounds);
        mapObject.current.relayout();
      }
    }
  }, [onSearchLocationDetail, searchData]);

  const searchLocation = useCallback(
    (keyword: string) => {
      if (kakaoMapSearch.current) {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            paginationObject.current = pagination as SearchResultPagination;
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

  const selectInList = useCallback((x: string, y: string, idx: number) => {
    if (kakaoMap.current) {
      const initCenter = new (window as any).kakao.maps.LatLng(y, x);

      infoWindows.current.forEach((infoWindowObject) =>
        infoWindowObject.close()
      );

      infoWindows.current[idx].open(mapObject.current, markers.current[idx]);
      mapObject.current.setLevel(2);
      mapObject.current.setCenter(initCenter);
    }
  }, []);

  return {
    kakaoMap,
    searchLocation,
    paginationObject: paginationObject.current,
    selectInList,
  };
};

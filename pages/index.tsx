import type { NextPage } from "next";

import { useCallback, useState } from "react";

import {
  LineChartOutlined,
  RedoOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  EventAlret,
  IconContainer,
  KakaoMap,
  MainContainer,
  SearchMenu,
  SubmitButton,
} from "src/components";
import { useKakaoMap } from "src/Hooks/useKakaoMap";

const iconData = [
  {
    icon: <RedoOutlined style={{ fontSize: "50px", color: "#939efb" }} />,
    link: "/",
  },
  {
    icon: <SearchOutlined style={{ fontSize: "50px", color: "#939efb" }} />,
    link: "/",
  },
  {
    icon: <LineChartOutlined style={{ fontSize: "50px", color: "#939efb" }} />,
    link: "/statistic",
  },
];

const Home: NextPage = () => {
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [detailPage, setDetailPage] = useState("");

  const onSearchData = (data: any[]) => {
    setSearchData(() => data);
  };

  const onSearchLocationDetail = useCallback((url: string) => {
    setDetailPage(url);
  }, []);

  const { kakaoMap, searchLocation, paginationObject } = useKakaoMap({
    setSearchData: onSearchData,
    searchData,
    onSearchLocationDetail,
  });

  return (
    <MainContainer>
      <IconContainer icons={iconData} />
      <SearchMenu
        searchLocation={searchLocation}
        searchData={searchData}
        paginationObject={paginationObject}
      />
      {detailPage && <iframe height="100%" width={663} src={detailPage} />}
      <KakaoMap kakaoMapObject={kakaoMap} />
      <EventAlret />
    </MainContainer>
  );
};

export default Home;

import type { NextPage } from "next";

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
import { useState } from "react";

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

  const onSearchData = (data: any[]) => {
    console.log(data);
    setSearchData(() => data);
  };

  const { kakaoMap, searchLocation } = useKakaoMap({
    setSearchData: onSearchData,
    searchData,
  });

  return (
    <MainContainer>
      <IconContainer icons={iconData} />
      <SearchMenu searchLocation={searchLocation} searchData={searchData} />
      <KakaoMap kakaoMapObject={kakaoMap} />
      <EventAlret />
    </MainContainer>
  );
};

export default Home;

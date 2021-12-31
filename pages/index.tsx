import type { NextPage } from "next";

import { useCallback, useEffect, useState } from "react";

import {
  LineChartOutlined,
  RedoOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  DetailIframe,
  EventAlret,
  IconContainer,
  KakaoMap,
  MainContainer,
  SearchMenu,
  SubmitButton,
} from "src/components";
import { useKakaoMap } from "src/Hooks/useKakaoMap";
import Modal from "antd/lib/modal/Modal";
import User from "src/service/Login";

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

  const onSearchLocationReset = useCallback(() => {
    setDetailPage("");
  }, []);

  const { kakaoMap, searchLocation, paginationObject, selectInList } =
    useKakaoMap({
      setSearchData: onSearchData,
      searchData,
      onSearchLocationDetail,
    });

  useEffect(() => {
    User.login("bigcoms", "123456");
  }, []);

  return (
    <MainContainer>
      <IconContainer icons={iconData} />
      <SearchMenu
        searchLocation={searchLocation}
        searchData={searchData}
        paginationObject={paginationObject}
        selectInList={selectInList}
      />
      <KakaoMap kakaoMapObject={kakaoMap} />
      <EventAlret />
      <Modal
        visible={Boolean(detailPage)}
        onCancel={onSearchLocationReset}
        footer={null}
        title="상세보기"
        width={900}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "800px",
        }}
      >
        <DetailIframe src={detailPage} />
      </Modal>
    </MainContainer>
  );
};

export default Home;

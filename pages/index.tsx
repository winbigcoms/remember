import type { NextPage } from "next";

import { useCallback, useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";

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

import User from "src/service/login";

import { useKakaoMap } from "src/Hooks/useKakaoMap";

import { SearchResult } from "src/types/searchResultType";
import Head from "next/head";

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
  const [detailPage, setDetailPage] = useState<SearchResult>({});
  const [userLocation, setUserLocation] = useState([]);
  const [userData, setUserData] = useState<User>({});
  const [modalVisible, setModalVisible] = useState(false);

  const onSearchData = (data: any[]) => {
    setSearchData(() => data);
  };

  const onSearchLocationDetail = useCallback((url: string) => {
    setDetailPage(url);
    setModalVisible(true);
  }, []);

  const onSearchLocationReset = useCallback(() => {
    setModalVisible(false);
    setDetailPage({});
  }, []);

  const { kakaoMap, searchLocation, paginationObject, selectInList } =
    useKakaoMap({
      setSearchData: onSearchData,
      searchData,
      onSearchLocationDetail,
      userLocation,
    });

  useEffect(() => {
    User.login("bigcoms", "123456").then((res) => {
      const { userData, locations } = res;

      if (userData) {
        setUserLocation(locations);
        setUserData(userData);
      }
    });
  }, []);

  return (
    <>
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
        {modalVisible && (
          <Modal
            visible={modalVisible}
            onCancel={onSearchLocationReset}
            footer={null}
            title="장소 상세보기"
            width={900}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "800px",
            }}
          >
            <DetailIframe
              detailPage={detailPage}
              visible={modalVisible}
              userData={userData}
              onClose={onSearchLocationReset}
            />
          </Modal>
        )}
      </MainContainer>
    </>
  );
};

export default Home;

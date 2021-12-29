import { useState } from "react";

import styled from "styled-components";

import Menu from "antd/lib/menu";

import { SearchMapSubmenu } from "./SearchMapSubmenu";
import { SearchLocationSubmenu } from "./SearchLocationSubmenu";
import { SearchSuggestSubmenu } from "./SearchSuggestSubmenu";

const { SubMenu } = Menu;

const rootSubmenuKeys = ["map", "myLocation", "suggest"];

const CustomSubMenu = styled(SubMenu)`
  font-size: 18px;

  &:not(:first-child) {
    border-top: 1px solid #ccc;
  }

  & > div {
    height: 51px !important;
  }
`;

const oldMockData = [
  {
    title: "중화반점",
    old: 15,
  },
  {
    title: "아웃백",
    old: 10,
  },
  {
    title: "마라",
    old: 5,
  },
];

interface SearchMenuProps {
  searchLocation: (keyword: stinrg) => void;
  searchData: SearchResult[];
}

export const SearchMenu = (props: SearchMenuProps) => {
  const { searchLocation, searchData } = props;

  const [openKeys, setOpenKeys] = useState(["map"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "15%",
        minWidth: 250,
        border: "1px solid #C8CEFD",
        borderLeft: "none",
      }}
    >
      <CustomSubMenu key="map" title="지도에서 검색">
        <SearchMapSubmenu
          searchLocation={searchLocation}
          searchData={searchData}
        />
      </CustomSubMenu>
      <CustomSubMenu key="myLocation" title="내 장소에서 검색">
        <SearchLocationSubmenu />
      </CustomSubMenu>
      <CustomSubMenu key="suggest" title="추천 리스트">
        <SearchSuggestSubmenu oldLocations={oldMockData} />
      </CustomSubMenu>
    </Menu>
  );
};

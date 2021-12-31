import { KeyboardEventHandler, useRef } from "react";

import styled from "styled-components";

import Input from "antd/lib/input";

import {
  SearchListItem,
  SearchListItemContainer,
  SearchPagination,
  SubmitButton,
} from "src/components";

import {
  SearchResult,
  SearchResultPagination,
} from "src/types/searchResultType";

import { SearchContainer } from "../SearchContainer";

interface SearchMapSubmenuProps {
  searchLocation: (keyword: string) => void;
  searchData: SearchResult;
  paginationObject: SearchResultPagination;
  selectInList: (x: string, y: string, idx: number) => void;
}

export const SearchMapSubmenu = (props: SearchMapSubmenuProps) => {
  const { searchLocation, searchData, paginationObject, selectInList } = props;
  const inputValue = useRef("");

  const onChange = (e: InputEvent) => {
    inputValue.current = e.target.value;
  };

  const onPressEnter = (e: KeyboardEventHandler<HTMLInputElement>) => {
    inputValue.current = e.target.value;
    searchLocation(e.target.value);
  };

  return (
    <SearchContainer>
      <Input
        placeholder="키워드 검색"
        onChange={onChange}
        onPressEnter={onPressEnter}
        style={{ marginBottom: "15px" }}
      />
      <SubmitButton
        text="찾아!"
        onSubmit={() => {
          searchLocation(inputValue.current);
        }}
      />
      {searchData.length !== 0 && (
        <SearchListItemContainer>
          {searchData.map((data, idx) => (
            <SearchListItem
              key={idx}
              x={data.x}
              y={data.y}
              place_name={data.place_name}
              category_name={data.category_name}
              phone={data.phone}
              idx={idx}
              selectInList={selectInList}
            />
          ))}
        </SearchListItemContainer>
      )}
      {paginationObject && paginationObject.last !== 1 && (
        <SearchPagination paginationObject={paginationObject} />
      )}
    </SearchContainer>
  );
};

import styled from "styled-components";

import Input from "antd/lib/input";

import { SubmitButton } from "src/components";
import { SearchContainer } from "../SearchContainer";
import { useRef } from "react";

interface SearchMapSubmenuProps {
  searchLocation: (keyword: string) => void;
  searchData: SearchResult;
}

export const SearchMapSubmenu = (props: SearchMapSubmenuProps) => {
  const { searchLocation, SearchResult } = props;
  const inputValue = useRef("");

  const onChange = (e: InputEvent) => {
    inputValue.current = e.target.value;
  };

  return (
    <SearchContainer>
      <Input placeholder="키워드 검색" onChange={onChange} />
      <SubmitButton
        text="찾아!"
        onSubmit={() => {
          console.log(inputValue.current);
          searchLocation(inputValue.current);
        }}
      />
    </SearchContainer>
  );
};

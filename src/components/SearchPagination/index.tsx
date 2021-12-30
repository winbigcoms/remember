import { Pagination } from "antd";

import styled from "styled-components";

import { SearchResultPagination } from "src/types/searchResultType";

interface SearchPaginationProps {
  paginationObject: SearchResultPagination;
}

const CustomPagination = styled(Pagination)`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const SearchPagination = (props: SearchPaginationProps) => {
  const { paginationObject } = props;

  const onChangePagination = (page: number) => {
    paginationObject.gotoPage(page);
  };

  return (
    <CustomPagination
      defaultPageSize={15}
      defaultCurrent={1}
      total={paginationObject.totalCount}
      onChange={onChangePagination}
    />
  );
};

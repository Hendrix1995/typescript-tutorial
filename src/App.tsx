import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import FilterDropdown from "./components/FilterDropdown";
import Contents from "./components/Contents";
import Pagination from "./components/Pagination";
import Skeleton from "./components/Skeleton";

type DataType = {
  id: number;
  title: string;
  price: number;
  images: Array<string>;
};

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  justify-content: space-around;
  gap: 12px;
  padding: 12px;
  background-color: rgba(207, 207, 207, 0.6);
  border-radius: 12px;
  margin: 12px;
`;

export const PageButton = styled.button`
  font-size: 20px;
  border: solid 2px;
  border-radius: 4px;
  box-shadow: gray 2px 2px 2px;
  transition: 140ms ease-in-out;
  margin: 12px;
  cursor: pointer;

  &:hover {
    box-shadow: gray 4px 4px 4px;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    transition: ease all;
  }

  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: ease all;
  }

  &:active {
    box-shadow: none;
  }
`;

const url = new URL(window.location.href);
const urlSearchParams = url.searchParams;

const getLimit = () => {
  return urlSearchParams.get("limit") === null ? 10 : Number(urlSearchParams.get("limit"));
};

const getPage = () => {
  return urlSearchParams.get("page") === null ? 1 : Number(urlSearchParams.get("page"));
};

function App() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState<number>(getLimit());
  const [currentPage, setCurrentPage] = useState<number>(getPage());
  const [skip, setSkip] = useState<number>(0);

  const getDataHandler = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,images`);
    return data;
  };

  const { isLoading, data, isError } = useQuery(["items", { limit, skip, currentPage }], getDataHandler);
  // 케싱
  // 두번 네트워크 요청 보내는거 찾아서 지우기
  const limitChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const pageChangedHandler = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    setSkip((Number(currentPage) - 1) * limit);
    urlSearchParams.set("limit", String(limit));
    urlSearchParams.set("page", String(currentPage));
    window.history.replaceState("replace", "null", url.href);
  }, [limit, currentPage]);

  useEffect(() => {
    if (skip >= 100) {
      setSkip(0);
      setCurrentPage(1);
    }
  }, [skip]);

  if (isError) return <div style={{ display: "flex", justifyContent: "center" }}>다시 시도해 주세요</div>;

  const limitArr = [];
  for (let i = 1; i <= limit; i++) {
    limitArr.push(i);
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <PageButton onClick={() => navigate("/chart")}>Go to Chart</PageButton>
      </div>
      {isLoading ? (
        <>
          <ItemContainer>
            {limitArr.map((el: number) => (
              <Skeleton key={el} />
            ))}
          </ItemContainer>
          <Pagination limit={limit} pageChangedHandler={pageChangedHandler} currentPage={currentPage} />
        </>
      ) : (
        <>
          <ItemContainer>
            {data.products.map((item: DataType) => (
              <Contents key={item.id} id={item.id} title={item.title} price={item.price} images={item.images} />
            ))}
          </ItemContainer>
          <Pagination limit={limit} pageChangedHandler={pageChangedHandler} currentPage={currentPage} />
          <FilterDropdown limitChangeHandler={limitChangeHandler} limit={limit} />
        </>
      )}
    </>
  );
}

export default App;

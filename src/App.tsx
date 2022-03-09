import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

import FilterDropdown from "./components/FilterDropdown";
import Contents from "./components/Contents";
import Pagination from "./components/Pagination";

type DataType = {
    id: number;
    title: string;
    price: number;
    images: Array<string>;
};

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba(207, 207, 207, 0.6);
    border-radius: 12px;
    margin: 30px;
`;

function App() {
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);

    const getDataHandler = async () => {
        const { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,images`);
        return data;
    };

    const { isLoading, data, isError } = useQuery(["items", limit, skip], getDataHandler);

    const limitChangeHandler = (e: any) => {
        setLimit(e.target.value);
    };

    const pageChangedHandler = (pageNum: any) => {
        setCurrentPage(pageNum);
    };

    useEffect(() => {
        setSkip((currentPage - 1) * limit);
    }, [limit, currentPage]);

    useEffect(() => {
        if (skip >= 100) {
            setSkip(0);
            setCurrentPage(1);
        }
    }, [skip]);

    if (isError) return <div>다시 시도해 주세요</div>;

    return (
        <>
            <FilterDropdown limitChangeHandler={limitChangeHandler} />
            <ItemContainer>{!isLoading && data.products.map((item: DataType) => <Contents key={item.id} id={item.id} title={item.title} price={item.price} images={item.images} />)}</ItemContainer>
            <Pagination limit={limit} pageChangedHandler={pageChangedHandler} currentPage={currentPage} />
        </>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import FilterDropdown from "./components/FilterDropdown";
import Contents from "./components/Contents";

type DataType = {
    id: number;
    title: string;
    price: number;
    images: Array<string>;
};

const ItemContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: rgba(207, 207, 207, 0.6);
    border-radius: 12px;
    margin: 30px auto;
    height: 90vh;
`;

function App() {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products?limit=10&skip=10&select=title,price,images`)
            .then((res) => {
                setData(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(data);

    return (
        <>
            <FilterDropdown />
            <ItemContainer>
                {data.map((item) => (
                    <Contents key={item.id} id={item.id} title={item.title} price={item.price} images={item.images} />
                ))}
            </ItemContainer>
        </>
    );
}

export default App;

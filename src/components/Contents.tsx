import React from "react";
import styled from "styled-components";

type DataType = {
    id: number;
    title: string;
    price: number;
    images: Array<string>;
};

const ItemContainer = styled.div`
    background-color: #ffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 7px;
    margin: 12px;
    width: 200px;
    height: 250px;
    border-radius: 15px;
`;

const ItemInfoContainer = styled.div`
    display: flex;
    margin: 8px;
`;

const ItemImg = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 4px;
`;

const ItemId = styled.div`
    margin-right: 10px;
`;

function Contents({ id, title, price, images }: DataType) {
    return (
        <ItemContainer>
            <ItemImg src={images[0]} />
            <ItemInfoContainer>
                <ItemId>{id}</ItemId>
                <div>{title}</div>
            </ItemInfoContainer>
            <div>$ {price}</div>
        </ItemContainer>
    );
}

export default Contents;

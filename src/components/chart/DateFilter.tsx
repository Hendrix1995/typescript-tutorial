import { useState } from "react";
import styled from "styled-components";

const DateFilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #d8dbe0;
    border-radius: 4px;
    overflow: hidden;
`;

const DateBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 1px;
`;

const DateInput = styled.input`
    position: relative;
    font-size: 16px;
`;

const FilterButtonBox = styled.div`
    display: flex;
    justify-content: center;
`;

const FilterButton = styled.button`
    cursor: pointer;
    transition: 120ms ease-in-out;
    border: 1px solid #d8dbe0;
    margin: -2px 0;
    height: 50px;

    &:hover {
        background-color: #3c4b64;
        color: #fff;
    }
`;

function DateFilter({
    startDate,
    endDate,
    getDateStr,
    today,
    lastMonth,
    startDateHandler,
    endDateHandler,
}: {
    startDate: string;
    endDate: string;
    getDateStr: any;
    today: any;
    lastMonth: any;
    startDateHandler: any;
    endDateHandler: any;
}) {
    const lastWeek = () => {
        const day = new Date();
        const dayOfMonth = day.getDate();
        day.setDate(dayOfMonth - 7);
        return getDateStr(day);
    };

    const sixMonth = () => {
        const day = new Date();
        const monthOfYear = day.getMonth();
        day.setMonth(monthOfYear - 6);
        return getDateStr(day);
    };

    const oneYear = () => {
        const day = new Date();
        const dayOfYear = day.getFullYear();
        day.setFullYear(dayOfYear - 1);
        return getDateStr(day);
    };

    return (
        <DateFilterContainer>
            <DateBox>
                <DateInput type="date" value={startDate} onChange={(e) => startDateHandler(e.target.value)} />
                <DateInput type="date" value={endDate} onChange={(e) => endDateHandler(e.target.value)} />
            </DateBox>
            <FilterButtonBox>
                <FilterButton
                    onClick={() => {
                        startDateHandler(today());
                        endDateHandler(today());
                    }}
                >
                    오늘
                </FilterButton>
                <FilterButton
                    onClick={() => {
                        startDateHandler(lastWeek());
                        endDateHandler(today());
                    }}
                >
                    1주일
                </FilterButton>
                <FilterButton
                    onClick={() => {
                        startDateHandler(lastMonth());
                        endDateHandler(today());
                    }}
                >
                    1개월
                </FilterButton>
                <FilterButton
                    onClick={() => {
                        startDateHandler(sixMonth());
                        endDateHandler(today());
                    }}
                >
                    6개월
                </FilterButton>
                <FilterButton
                    onClick={() => {
                        startDateHandler(oneYear());
                        endDateHandler(today());
                    }}
                >
                    1년
                </FilterButton>
                <FilterButton
                    onClick={() => {
                        startDateHandler("2020-01-01");
                        endDateHandler(today());
                    }}
                >
                    전체
                </FilterButton>
            </FilterButtonBox>
        </DateFilterContainer>
    );
}

export default DateFilter;

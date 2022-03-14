import { useState, useEffect } from "react";
import styled from "styled-components";

type DateType = {
    getDateStr: any;
    startDateHandler: any;
    endDateHandler: any;
    startDate: string;
    endDate: string;
    today: any;
    day: any;
};

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

const Date = styled.input`
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

type DayListType = {
    lastWeek: string;
    lastMonth: string;
    sixMonth: string;
    oneYear: string;
};

function DateFilter({ day, getDateStr, startDateHandler, endDateHandler, startDate, endDate, today }: DateType) {
    const lastWeek = () => {
        const dayOfMonth = day.getDate();
        day.setDate(dayOfMonth - 7);
        return getDateStr(day);
    };

    const lastMonth = () => {
        const monthOfYear = day.getMonth();
        day.setMonth(monthOfYear - 1);
        return getDateStr(day);
    };

    const sixMonth = () => {
        const monthOfYear = day.getMonth();
        day.setMonth(monthOfYear - 5);
        return getDateStr(day);
    };

    const oneYear = () => {
        const dayOfYear = day.getFullYear();
        day.setDate(dayOfYear - 1);
        return getDateStr(day);
    };

    const [dayList, setDayList] = useState<DayListType>({ lastWeek: lastWeek(), lastMonth: lastMonth(), sixMonth: sixMonth(), oneYear: oneYear() });
    console.log(dayList);

    return (
        <DateFilterContainer>
            <DateBox>
                <Date type="date" value={startDate} onChange={(e) => startDateHandler(e.target.value)} />
                <Date type="date" value={endDate} onChange={(e) => endDateHandler(e.target.value)} />
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

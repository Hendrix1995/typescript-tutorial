import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

function DateFilter() {
    const getDateStr = (myDate: any) => {
        let month = myDate.getMonth();
        let toStringMonth = "";
        if (month < 10) toStringMonth = "0" + String(month + 1);
        else toStringMonth = String(month + 1);
        let day = myDate.getDate();
        let toStringDay = "";
        if (String(day).length === 1) toStringDay = "0" + String(day);
        else toStringDay = String(day);
        return `${myDate.getFullYear()}-${toStringMonth}-${toStringDay}`;
    };

    const today = () => {
        const day = new Date();
        return getDateStr(day);
    };

    const lastWeek = () => {
        const day = new Date();
        const dayOfMonth = day.getDate();
        day.setDate(dayOfMonth - 7);
        return getDateStr(day);
    };

    const lastMonth = () => {
        const day = new Date();
        const monthOfYear = day.getMonth();
        day.setMonth(monthOfYear - 1);
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

    const [startDate, setStartDate] = useState<string>(today());
    const [endDate, setEndDate] = useState<string>(today());

    const startDateHandler = (date: string) => {
        setStartDate(date);
    };
    const endDateHandler = (date: string) => {
        setEndDate(date);
    };

    const searchParams = () => {};

    const getDateHandler = async () => {
        const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user?startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDczMDU3MTUsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiODVkYWM0MzAtY2I3Yi00YzE0LWI2OGQtN2EzZmU4MzdmZjlhIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.GPb0_wd_UvsBYVut1RtGsaLUSXCq9IsrG3FiDH0TrgU`,
            },
        });
        return data;
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

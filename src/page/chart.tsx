/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { PageButton } from "../App";

import DateFilter from "../components/chart/DateFilter";
import Charts from "../components/chart/Charts";

const CardBody = styled.div`
    background-color: #ebedef;
    padding: 20px 14px;
`;

const MainBody = styled.div`
    background-color: #fff;
    padding: 20px 14px;
    border: 1px solid #d8dbe0;
    border-radius: 4px;
`;

const NumInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
`;

const NumInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    border: 1px solid #d8dbe0;
    border-radius: 4px;
    height: 100px;
    width: 210px;
    padding: 16px;
`;

const NumInfo = styled.div`
    display: block;
    margin-left: auto;
    font-size: 25px;
    color: #3c4b64;
`;

const getTotalHandler = async () => {
    const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user/total`, {
        headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDczMDU3MTUsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiODVkYWM0MzAtY2I3Yi00YzE0LWI2OGQtN2EzZmU4MzdmZjlhIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.GPb0_wd_UvsBYVut1RtGsaLUSXCq9IsrG3FiDH0TrgU`,
        },
    });
    return data;
};

const replaceNumHandler = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function chart() {
    const { isLoading, data, isError } = useQuery("total", getTotalHandler);

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

    const day = new Date();
    const today = () => {
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

    const getDateHandler = async () => {
        const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user?startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDczMDU3MTUsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiODVkYWM0MzAtY2I3Yi00YzE0LWI2OGQtN2EzZmU4MzdmZjlhIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.GPb0_wd_UvsBYVut1RtGsaLUSXCq9IsrG3FiDH0TrgU`,
            },
        });
        return data;
    };

    return (
        <>
            <PageButton>Go to Home</PageButton>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <CardBody>
                    <MainBody>
                        <NumInfoContainer>
                            <NumInfoBox>
                                전체 회원수
                                <NumInfo>{replaceNumHandler(data.totalCount)}명</NumInfo>
                            </NumInfoBox>
                            <NumInfoBox>
                                오늘 가입 회원수
                                <NumInfo>{replaceNumHandler(data.todayCount)}명</NumInfo>
                            </NumInfoBox>
                            <NumInfoBox>
                                활성 회원수
                                <NumInfo>{replaceNumHandler(data.statusCount[1].count)}명</NumInfo>
                            </NumInfoBox>
                            <NumInfoBox>
                                휴먼 회원수
                                <NumInfo>0명</NumInfo>
                            </NumInfoBox>
                            <NumInfoBox>
                                탈퇴 회원수
                                <NumInfo>{replaceNumHandler(data.statusCount[0].count)}명</NumInfo>
                            </NumInfoBox>
                        </NumInfoContainer>
                        <hr style={{ margin: "32px 0", borderColor: "rgba(0,0,21,.2)" }} />
                        <DateFilter day={day} getDateStr={getDateStr} startDateHandler={startDateHandler} endDateHandler={endDateHandler} startDate={startDate} endDate={endDate} today={today} />
                        <Charts />
                    </MainBody>
                </CardBody>
            )}
        </>
    );
}

export default chart;

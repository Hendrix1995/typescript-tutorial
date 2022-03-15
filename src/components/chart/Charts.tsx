import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { useQuery } from "react-query";
import axios from "axios";

function Charts({ startDate, endDate }: { startDate: string; endDate: string }) {
    const getDateHandler = async () => {
        const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user?startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDczOTIyMTUsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiM2M1M2U0ZDctM2MyMi00YWNmLThjNjktYTY3ZDYxYjlkYWZiIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.A27WyercfiYA5fynusQBTZA5L44schq7-LgkLRWRxio`,
            },
        });
        return data;
    };

    const { isLoading, data, isError } = useQuery(["date", { startDate, endDate }], getDateHandler);

    console.log(data);

    if (isError) {
        return <div>에러!!!</div>;
    }

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h4 style={{ margin: "20px" }}>일자별 가입 회원수</h4>
                    {data.countByDate.length === 0 ? (
                        <div>불러올 데이터가 없습니다</div>
                    ) : (
                        <>
                            <LineChart width={1030} height={250} data={data.countByDate} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="date" />
                                <YAxis dataKey="count" interval={"preserveStartEnd"} allowDecimals={false} />
                                <Tooltip filterNull={false} />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#f9b115" />
                            </LineChart>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Charts;

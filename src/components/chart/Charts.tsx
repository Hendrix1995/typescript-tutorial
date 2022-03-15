import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell, Label } from "recharts";
import { useQuery } from "react-query";
import { format, addDays, differenceInDays } from "date-fns";
import axios from "axios";

function Charts({ startDate, endDate }: { startDate: string; endDate: string }) {
  const getDateHandler = async () => {
    const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDczOTIyMTUsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiM2M1M2U0ZDctM2MyMi00YWNmLThjNjktYTY3ZDYxYjlkYWZiIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.A27WyercfiYA5fynusQBTZA5L44schq7-LgkLRWRxio`,
      },
    });
    if (data !== undefined) {
      return data;
    }
  };

  const { isLoading, data, isError } = useQuery(["date", { startDate, endDate }], getDateHandler);

  const addNullDate: any = (arr: [{ date: string; count: number | null }] | undefined) => {
    if (arr !== undefined) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      let laftDays = differenceInDays(start, end) * -1 + 1;
      let result: any = [];
      let isNotNullArr = [];
      let isNotNullCount = [];
      for (let i = 0; i < arr.length; i++) {
        isNotNullArr.push(arr[i].date);
        isNotNullCount.push(arr[i].count);
      }

      while (laftDays > 0) {
        if (isNotNullArr[0] === format(start, "yyyy-MM-dd")) {
          result.push({ date: isNotNullArr.shift(), count: isNotNullCount.shift() });
        } else {
          result.push({ date: format(start, "yyyy-MM-dd"), count: 0 });
        }
        start = addDays(start, 1);
        laftDays--;
      }
      return result;
    }
  };

  const ChartContainer = styled.div``;

  const PieChartContainer = styled.div``;

  const PieChartBox = styled.div``;

  if (isError) {
    return <div>에러!!!</div>;
  }

  console.log(data);
  const pieColors = ["#fbb4ae", "#b3cde3"];

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ChartContainer>
          <>
            <h4 style={{ margin: "20px" }}>일자별 가입 회원수</h4>
            {data.countByDate.length === 0 ? (
              <div>불러올 데이터가 없습니다</div>
            ) : (
              <ChartContainer>
                <LineChart width={1030} height={250} data={addNullDate(data?.countByDate)}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="count" allowDecimals={false} allowDataOverflow={true} scale="linear" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#f9b115" />
                </LineChart>
              </ChartContainer>
            )}
          </>
          <PieChartContainer>
            <PieChartBox>
              <h4 style={{ margin: "20px" }}>성별</h4>
              <PieChart width={330} height={300}>
                <Pie data={data?.countGenderByDate} dataKey="count" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
                  {data?.countGenderByDate.map((el: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </PieChartBox>
          </PieChartContainer>
        </ChartContainer>
      )}
    </>
  );
}

export default Charts;

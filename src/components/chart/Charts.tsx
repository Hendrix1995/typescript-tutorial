import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useQuery } from "react-query";
import { format, addDays, differenceInDays } from "date-fns";
import axios from "axios";

const PieChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BarChartContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Charts({ startDate, endDate }: { startDate: string; endDate: string }) {
  const getDateHandler = async () => {
    const { data } = await axios.get(`http://dev-admin.ittang.co.kr/api/statistic/user?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2FzaXNidXNpbmVzcyJdLCJhZG1pbl91c2VyX2lkIjozNCwidXNlcl9uYW1lIjoiSUQ6aHMubGltIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2NDc0Nzg2NDYsImF1dGhvcml0aWVzIjpbIlJPTEVfUEFZTUVOVF9SRUFEIiwiUk9MRV9BUlRJQ0xFIiwiUk9MRV9JVEVNIiwiUk9MRV9QQVlNRU5UX1VQREFURSIsIlJPTEVfUEFZTUVOVCIsIlJPTEVfUEFSVE5FUiIsIlJPTEVfSVRMT1VOREdFIiwiUk9MRV9EQVNIQk9BUkQiLCJST0xFX1VTRVIiLCJST0xFX05PVElDRSIsIlJPTEVfR09PRFMiLCJST0xFX0FETUlOIiwiUk9MRV9DT1VQT04iXSwianRpIjoiMWFjYWUxZjAtNzU3Yi00ZGE0LThjZmEtMzE5YjIyYzRlYWIxIiwiY2xpZW50X2lkIjoib2FzaXNidXNpbmVzcyJ9.53GR1quxYXjfE23mduEd40B3tYWmO8Yy0wJMkpX4weo`,
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

  if (isError) {
    return <div>에러!!!</div>;
  }

  const changeKey = (arr: any[]) => {
    let result: any = [];
    arr.forEach((obj) => {
      if (obj.hasOwnProperty("objKey")) {
        obj.name = obj.objKey;
        delete obj.objKey;
      }
      result.push(obj);
    });
    return result;
  };

  const ageChangeValue = (arr: any[]) => {
    let result: any = [];
    arr.forEach((el: any, index: number) => {
      let temp = el.objKey;
      if (temp === "UNKNOWN") {
        result.push({ objKey: "알수없음", count: el.count });
      } else {
        result.push({ objKey: temp + "대", count: el.count });
      }
    });
    return result;
  };

  const genderColorPicker = (el: any) => {
    if (el === undefined) return;
    if (el.name === "FEMALE") return "#fbb4ae";
    if (el.name === "MALE") return "#b3cde3";
    else return "#CCEBC5";
  };

  const socialColorPicker = (el: any) => {
    if (el === undefined) return;
    if (el.name === "KAKAO") return "#FDD100";
    if (el.name === "NAVER") return "#19CE60";
    else return "#333333";
  };

  const genderPayloadHandler = (el: any) => {
    if (el.payload[0].name === "FEMALE") return "여성";
    if (el.payload[0].name === "MALE") return "남성";
    if (el.payload[0].name === "UNKNOWN") return "알수없음";
    else return "";
  };

  const socialPayloadHandler = (el: any) => {
    if (el.payload[0].name === "KAKAO") return "카카오";
    if (el.payload[0].name === "NAVER") return "네이버";
    if (el.payload[0].name === "APPLE") return "애플";
    else return "";
  };

  const replaceNumHandler = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>Loading...</div>
      ) : (
        <>
          {data.countByDate.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>불러올 데이터가 없습니다</div>
          ) : (
            <>
              <h4 style={{ margin: "20px" }}>일자별 가입 회원수</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="80%" height={280}>
                  <LineChart data={addNullDate(data?.countByDate)}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="count" allowDecimals={false} allowDataOverflow={true} scale="linear" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#f9b115" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <PieChartContainer>
                <div>
                  <h4 style={{ margin: "20px" }}>성별</h4>
                  <PieChart width={420} height={380}>
                    <Pie
                      data={changeKey(data?.countGenderByDate)}
                      dataKey="count"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius) + 10;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const inRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const inX = cx + inRadius * Math.cos(-midAngle * RADIAN);
                        const inY = cy + inRadius * Math.sin(-midAngle * RADIAN);
                        return (
                          <>
                            <text x={inX} y={inY} textAnchor={inX > cx ? "start" : "end"} dominantBaseline="central">
                              {data?.countGenderByDate[index].count}
                            </text>
                            <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                              {data?.countGenderByDate[index].name === "FEMALE" ? "여성" : null}
                              {data?.countGenderByDate[index].name === "MALE" ? "남성" : null}
                              {data?.countGenderByDate[index].name === "UNKNOWN" ? "알수없음" : null}
                            </text>
                          </>
                        );
                      }}
                    >
                      {data?.countGenderByDate.map((el: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={genderColorPicker(el)} />
                      ))}
                    </Pie>
                    <Legend
                      content={() => (
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                          {data?.countGenderByDate.map((el: any, index: number) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ width: "15px", height: "15px", backgroundColor: `${genderColorPicker(el)}`, borderRadius: "50px", marginRight: "5px" }} />
                              <div>
                                {el.name === "FEMALE" ? "여성" : null}
                                {el.name === "MALE" ? "남성" : null}
                                {el.name === "UNKNOWN" ? "알수없음" : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Tooltip
                      content={(el: any) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            border: "1px solid white",
                            boxShadow: "gray 2px 2px 2px 2px",
                            backgroundColor: "#fff",
                            borderRadius: "2px",
                            padding: "4px",
                          }}
                        >
                          <div style={{ width: "20px", height: "20px", backgroundColor: `${genderColorPicker(el.payload[0])}`, marginRight: "5px" }} />
                          {el.payload[0] === undefined ? null : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ marginRight: "5px" }}>{genderPayloadHandler(el)}:</div>
                              <div style={{ fontWeight: "bold" }}>{replaceNumHandler(el.payload[0].value)}</div>
                            </div>
                          )}
                          <div />
                        </div>
                      )}
                    />
                  </PieChart>
                </div>
                <div>
                  <h4 style={{ margin: "20px" }}>채널별</h4>
                  <PieChart width={430} height={365}>
                    <Pie
                      data={changeKey(data?.countSocialTypeByDate)}
                      dataKey="count"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius) + 10;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const inRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const inX = cx + inRadius * Math.cos(-midAngle * RADIAN);
                        const inY = cy + inRadius * Math.sin(-midAngle * RADIAN);
                        return (
                          <>
                            <text x={inX} y={inY} textAnchor={inX > cx ? "start" : "end"} dominantBaseline="central">
                              {data?.countSocialTypeByDate[index].count}
                            </text>
                            <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                              {data?.countSocialTypeByDate[index].name === "KAKAO" ? "카카오" : null}
                              {data?.countSocialTypeByDate[index].name === "NAVER" ? "네이버" : null}
                              {data?.countSocialTypeByDate[index].name === "APPLE" ? "애플" : null}
                            </text>
                          </>
                        );
                      }}
                    >
                      {data?.countSocialTypeByDate.map((el: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={socialColorPicker(el)} />
                      ))}
                    </Pie>
                    <Legend
                      content={() => (
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                          {data?.countSocialTypeByDate.map((el: any, index: number) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ width: "15px", height: "15px", backgroundColor: `${socialColorPicker(el)}`, borderRadius: "50px", marginRight: "5px" }} />
                              <div>
                                {el.name === "KAKAO" ? "카카오" : null}
                                {el.name === "NAVER" ? "네이버" : null}
                                {el.name === "APPLE" ? "애플" : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Tooltip
                      content={(el: any) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            border: "1px solid white",
                            boxShadow: "gray 2px 2px 2px 2px",
                            backgroundColor: "#fff",
                            borderRadius: "2px",
                            padding: "4px",
                          }}
                        >
                          <div style={{ width: "20px", height: "20px", backgroundColor: `${socialColorPicker(el.payload[0])}`, marginRight: "5px" }} />
                          {el.payload[0] === undefined ? null : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ marginRight: "5px" }}>{socialPayloadHandler(el)}:</div>
                              <div style={{ fontWeight: "bold" }}>{replaceNumHandler(el.payload[0].value)}</div>
                            </div>
                          )}
                          <div />
                        </div>
                      )}
                    />
                  </PieChart>
                </div>
              </PieChartContainer>
              <h4 style={{ margin: "40px" }}>연령별</h4>
              <BarChartContainer>
                <ResponsiveContainer width="60%" height={200}>
                  <BarChart width={150} height={40} data={ageChangeValue(data?.countAgeGroupByDate)} barSize={30}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="objKey" />
                    <YAxis dataKey="count" allowDecimals={false} allowDataOverflow={true} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="count" fill="#a6cee3" background={{ fill: "#eee" }} label={{ position: "top" }} />
                  </BarChart>
                </ResponsiveContainer>
              </BarChartContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Charts;

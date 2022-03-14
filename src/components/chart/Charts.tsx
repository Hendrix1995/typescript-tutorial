import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

function Charts() {
    return (
        <>
            <h4 style={{ margin: "20px" }}>일자별 가입 회원수</h4>
            {/* <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart> */}
        </>
    );
}

export default Charts;

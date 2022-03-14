import { BarChart, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

function Chart({ data }: any) {
    return (
        <BarChart width={1200} height={400} data={data.products} style={{ margin: "30px auto" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
    );
}

export default Chart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Remove vertical grid lines by setting vertical={false} */}
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis
          stroke="#808080" // Set the Y-axis line color
          tick={{ fill: "#808080", fontSize: 14 }} // Y-axis ticks color and font size
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} radius={[10, 10, 0, 0]} />
        <Bar dataKey="pv" fill="#82ca9d" barSize={30} radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

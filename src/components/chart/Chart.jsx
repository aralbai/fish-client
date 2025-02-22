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
  {
    name: "Yanvar",
    Расход: 24000000,
    Доход: 40000000,
    Прибыль: 16000000,
    Пополнение: 34000000,
    Снимать: 23000000,
  },
  {
    name: "Fevral",
    Расход: 13980000,
    Доход: 30000000,
    Прибыль: 16000000,
    Пополнение: 27000000,
    Снимать: 10000000,
  },
  {
    name: "Mart",
    Расход: 48000000,
    Доход: 20000000,
    Прибыль: 16000000,
    Пополнение: 31000000,
    Снимать: 15000000,
  },
  {
    name: "Aprel",
    Расход: 39080000,
    Доход: 27800000,
    Прибыль: 16000000,
    Пополнение: 25000000,
    Снимать: 35000000,
  },
  {
    name: "May",
    Расход: 48000000,
    Доход: 18900000,
    Прибыль: 16000000,
    Пополнение: 22000000,
    Снимать: 26000000,
  },
  {
    name: "Iyun",
    Расход: 38000000,
    Доход: 23900000,
    Прибыль: 16000000,
    Пополнение: 18000000,
    Снимать: 13000000,
  },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Remove vertical grid lines by setting vertical={false} */}
        <CartesianGrid stroke="#ccc" strokeWidth={0.5} vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#ccc"
          strokeWidth={0.5}
          tick={{ fill: "#808080", fontSize: 15 }}
        />
        <YAxis
          tickFormatter={(value) => {
            if (value >= 1000000) return `${value / 1000000}M`;
            if (value >= 1000) return `${value / 1000}K`;
            return value;
          }}
          stroke="#ccc"
          strokeWidth={0.5} // Set the Y-axis line color
          tick={{ fill: "#808080", fontSize: 15 }} // Y-axis ticks color and font size
        />
        <Tooltip
          contentStyle={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
          formatter={(value) => new Intl.NumberFormat("ru-RU").format(value)}
        />

        <Legend />
        <Bar
          dataKey="Расход"
          fill="#FF6378"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Доход"
          fill="#115293"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Прибыль"
          fill="#28A745"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Пополнение"
          fill="#17A2B8"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Снимать"
          fill="#FFC107"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

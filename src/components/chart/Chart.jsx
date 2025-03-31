import { fetchData } from "@/utils/fetchData";
import { setMonths } from "@/utils/setMonths";
import React, { useEffect, useState } from "react";
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

const Chart = () => {
  const [barSize, setBarSize] = useState(20);
  const [fontSize, setFontSize] = useState(15);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setBarSize(10); // Smaller bars on mobile
        setFontSize(12); // Smaller font size on mobile
      } else {
        setBarSize(20);
        setFontSize(15);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sells, setSells] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const data = [
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
    {
      name: "",
      Расход: 0,
      Доход: 0,
      month: new Date(),
    },
  ];

  const firstDate = new Date();
  const month1 = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth() - 5,
    1,
    0,
    0,
    0,
    0
  );

  const month6 = new Date();

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(firstDate); // Clone firstDate to avoid mutations
    monthDate.setMonth(firstDate.getMonth() - i, 1); // Ensure the first day of the month

    data[5 - i].month = monthDate; // Assign the corrected date
    data[5 - i].name = setMonths(monthDate.getMonth()); // Format the month name correctly

    const monthSells = sells.filter(
      (sell) => new Date(sell.addedDate).getMonth() === monthDate.getMonth()
    );

    const monthOutcomes = outcomes.filter(
      (outcome) =>
        new Date(outcome.addedDate).getMonth() === monthDate.getMonth()
    );

    const monthPurchases = purchases.filter(
      (purchase) =>
        new Date(purchase.addedDate).getMonth() === monthDate.getMonth()
    );

    const totalPurchase = monthPurchases.reduce(
      (sum, purchase) => sum + purchase.totalPrice,
      0
    );

    const totalOutcome = monthOutcomes.reduce(
      (sum, outcome) => sum + outcome.amount,
      0
    );

    const totalSells = monthSells.reduce((sum, sell) => sum + sell.given, 0);

    data[5 - i].Расход = totalOutcome + totalPurchase;
    data[5 - i].Доход = totalSells;
  }

  useEffect(() => {
    fetchData(`/sells/query?startDate=${month1}&endDate=${month6}`, setSells);

    fetchData(
      `/outcomes/query?startDate=${month1}&endDate=${month6}`,
      setOutcomes
    );

    fetchData(
      `/purchases/query?startDate=${month1}&endDate=${month6}`,
      setPurchases
    );
  }, []);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Remove vertical grid lines by setting vertical={false} */}
        <CartesianGrid stroke="#ccc" strokeWidth={0.5} vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#ccc"
          strokeWidth={0.5}
          tick={{ fill: "#808080", fontSize }}
        />
        {barSize > 10 && (
          <YAxis
            tickFormatter={(value) => {
              if (value >= 1_000_000_000) return `${value / 1_000_000_000}B`;
              if (value >= 1_000_000) return `${value / 1_000_000}M`;
              if (value >= 1_000) return `${value / 1_000}K`;
              return value;
            }}
            stroke="#ccc"
            strokeWidth={0.5} // Set the Y-axis line color
            tick={{ fill: "#808080", fontSize }} // Y-axis ticks color and font size
          />
        )}
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
          barSize={barSize}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Доход"
          fill="#28A745"
          barSize={barSize}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

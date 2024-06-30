import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6361",
  "#58508D",
  "#FFA600",
  "#BC5090",
  "#003f5c",
  "#7a5195",
];

const PieChartComponent = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        // className="pl-2"
        wrapperStyle={{ marginLeft: 8 }}
      />
    </PieChart>
  </div>
);

export default PieChartComponent;

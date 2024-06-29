import React from "react";
import { UserResponsePieChartWrapper } from "./styled";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import LoadingOverlay from "@/components/LoadingOverlay";

const UserResponsePiechart = ({ data = [], isLoading }) => {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];
  return (
    <UserResponsePieChartWrapper className="flex flex-col items-center">
      <h2 className="font-bold text-[14px] mb-4">
        Đánh giá tỉ lệ trả lời của bot
      </h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={"50%"}
            cy={"50%"}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {isLoading && <LoadingOverlay />}
    </UserResponsePieChartWrapper>
  );
};

export default UserResponsePiechart;

import React from "react";
import { UserRequestBarChartWrapper } from "./styled";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Spin } from "antd";
import LoadingOverlay from "@/components/LoadingOverlay";

const UserRequestBarChart = ({ data, isLoading, ...props }) => {
  console.log(data);
  return (
    <UserRequestBarChartWrapper {...props}>
      <h2 className="font-bold text-[14px] mb-4">
        Thống kê sử dụng người dùng
      </h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="số lượng request"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
      {isLoading && <LoadingOverlay />}
    </UserRequestBarChartWrapper>
  );
};

export default UserRequestBarChart;

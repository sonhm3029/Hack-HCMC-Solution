import React, { useEffect, useMemo } from "react";
import DashboardPageWrapper from "./styled";
import useCustomState from "@/hooks/useCustomState";
import statisticProvider from "@/data-access/statisticProvider";
import { loadingIndicatorRef } from "@/main";
import { SUCCESS_CODE } from "@/constants/status_code";
import { notification } from "antd";
import PieChartComponent from "./PieChartComponent";

const DashboardPage = () => {
  const [state, setState] = useCustomState({
    data: null,
  });

  const transformData = (categoryData) => {
    return Object.keys(categoryData).map((key) => ({
      name: key,
      value: categoryData[key],
    }));
  };

  const getData = () => {
    loadingIndicatorRef.current.show();
    statisticProvider
      .get()
      .then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          setState({
            data: res?.data?.data,
          });
        } else {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        notification.error({
          description: err?.message,
        });
      })
      .finally(() => {
        loadingIndicatorRef.current.hide();
      });
  };

  const transformedData = useMemo(() => {
    if (state?.data?.beer_box) {
      return {
        // beer_box: transformData(state?.data?.beer_box),
        beer_product: transformData(state?.data?.beer_product),
        drinking_human: transformData(state?.data?.drinking_human),
      };
    }
    return {};
  }, [state.data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardPageWrapper className="p-4">
      <h1 className="font-bold text-3xl mb-7">Dashboard</h1>
      <div className="text-left text-[16px]">
        <strong>Total location</strong>: {state?.data?.total_location}
      </div>
      <div className="charts flex justify-between mt-6">
        {Object.keys(transformedData).map((key) => (
          <div className="chart-wrapper ml-3" key={key}>
            <PieChartComponent
              data={transformedData[key]}
              title={key.replace(/_/g, " ").toUpperCase()} // Formatting title
            />
          </div>
        ))}
      </div>
    </DashboardPageWrapper>
  );
};

export default DashboardPage;

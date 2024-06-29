import React, { useEffect } from "react";
import DetailDataPageWrapper from "./styled";
import { Link, useParams } from "react-router-dom";
import useCustomState from "@/hooks/useCustomState";
import { loadingIndicatorRef } from "@/main";
import dataProvider from "@/data-access/dataProvider";
import { SUCCESS_CODE } from "@/constants/status_code";
import { Button, notification } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { RouteName } from "@/routes/constants";

const DetailDataPage = () => {
  const { id } = useParams();
  const [state, setState] = useCustomState({
    data: [],
  });

  const getData = () => {
    loadingIndicatorRef.current.show();
    dataProvider
      .search({ id })
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
          description: err?.messsage,
        });
      })
      .finally(() => {
        loadingIndicatorRef.current.hide();
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DetailDataPageWrapper className="p-4">
      <div className="flex items-center">
        <Link to={RouteName.DATA_PAGE}>
          <Button
            className="h-9 flex justify-center items-center"
            type="primary"
          >
            <LeftOutlined />
          </Button>
        </Link>
        <div className="flex-1 text-center">
          {" "}
          <h1 className="font-bold text-xl">{state?.data?.location}</h1>
        </div>
      </div>
      <div className="flex">
        <div className="image-present"></div>
        <div className="result-predict"></div>
      </div>
    </DetailDataPageWrapper>
  );
};

export default DetailDataPage;

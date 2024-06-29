import React, { useEffect } from "react";
import DataPageWrapper from "./styled";
import { loadingIndicatorRef } from "@/main";
import dataProvider from "@/data-access/dataProvider";
import { SUCCESS_CODE } from "@/constants/status_code";
import { Button, Card, Col, Popconfirm, Row, notification } from "antd";
import useCustomState from "@/hooks/useCustomState";
import { useNavigate } from "react-router-dom";
import { RouteName } from "@/routes/constants";

const DataPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useCustomState({
    data: [],
  });

  const getData = async () => {
    loadingIndicatorRef.current.show();
    dataProvider
      .search({})
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

  const onViewDetail = (_id) => (e) => {
    e.preventDefault();
    navigate(RouteName.DETAIL_DATA_PAGE.replace(":id", _id));
  };

  const onConfirmRunDetectAll = () => {
    
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <DataPageWrapper className="p-5">
      <h1 className="font-bold text-2xl mb-3">List collected data</h1>
      <div className="functions-section mb-3 text-right">
        <Popconfirm onConfirm={onConfirmRunDetectAll} description="Do you want to run detect all. If it still has image that not predicted yet, system will making prediction!">
          <Button type="primary">Run detect all</Button>
        </Popconfirm>
      </div>
      <Row gutter={[16, 16]}>
        {state?.data?.map((item, index) => (
          <Col
            key={index}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            className="data-location-wrapper cursor-pointer"
            onClick={onViewDetail(item?._id)}
          >
            <Card title={item?.location}>
              <p>{item?.note || "Nothing to display"}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </DataPageWrapper>
  );
};

export default DataPage;

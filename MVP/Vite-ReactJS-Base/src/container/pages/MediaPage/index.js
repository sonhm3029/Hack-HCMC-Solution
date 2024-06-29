import React, { useEffect, useRef } from "react";
import MediaPageWrapper from "./styled";
import { useDispatch, useSelector } from "react-redux";
import useCustomState from "@/hooks/useCustomState";
import axiosUtils from "@/utils/axios-utils";
import {
  Button,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Tooltip,
  notification,
} from "antd";
import {
  CloseCircleOutlined,
  CopyFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { renderLongString } from "@/utils/string";
import { debounce } from "lodash";
import { copyToClipBoard } from "@/utils";
import { loadingIndicatorRef } from "@/main";
import mediaProvider from "@/data-access/mediaProvider";
import { SUCCESS_CODE } from "@/constants/status_code";
import ModalUploadMedia from "./ModalUploadMedia";

const { Search } = Input;

const MediaPage = () => {
  const [state, setState] = useCustomState({
    page: 0,
    size: 10,
  });

  const modalUploadMediaRef = useRef();

  const search = useDispatch()["media"].search;
  const { isLoading, listData: listImages, totalElements } = useSelector(
    (state) => state?.media
  );

  const onPageSizeChange = (page, pageSize) => {
    setState({
      page: page - 1,
      size: pageSize,
    });

    search({
      page: page - 1,
      size: pageSize,
      name: state?.name,
    });
  };

  const onSearch = debounce((e) => {
    let params = {
      page: 0,
      size: state?.size,
      name: e?.target?.value,
    };
    setState({
      ...params,
    });

    search({
      ...params,
    });
  }, 500);

  const onDeleteData = (item) => (_) => {
    let choice = confirm("Bạn có chắc muốn xóa ảnh này");

    if (choice) {
      loadingIndicatorRef.current.show();
      mediaProvider
        .delete([item?._id])
        .then((res) => {
          if (res?.data?.code === SUCCESS_CODE) {
            notification.success({
              description: "Xóa dữ liệu thành công",
            });
            let params = {
              page: state?.page,
              size: state?.size,
              name: state?.name,
            };
            search({
              ...params,
            });
          } else {
            throw new Error(res?.data?.message);
          }
        })
        .catch((err) => {
          notification.error({
            description: err?.message || "Lỗi xóa dữ liệu",
          });
        })
        .finally(() => {
          loadingIndicatorRef.current.hide();
        });
    }
  };

  const onCopy = (value) => (_) => {
    copyToClipBoard(`<img src='${value}'/>`);
  };

  const onOpenModalUpload = () => {
    modalUploadMediaRef.current.show();
  };

  const outsideChange = () => {
    let params = {
      page: state?.page,
      size: state?.size,
      name: state?.name,
    };
    search({
      ...params,
    });
  };

  useEffect(() => {
    search({
      page: state.page,
      size: state.size,
    });
  }, []);

  return (
    <MediaPageWrapper className="p-3">
      <h1 className="font-bold text-black text-xl">Media page</h1>
      <div className="header-function flex justify-between mt-12">
        <Search onChange={onSearch} placeholder="Tìm theo tên..." />
        <Button
          type="primary"
          className="flex items-center justify-center ml-4"
          onClick={onOpenModalUpload}
        >
          <PlusCircleOutlined />
          Upload
        </Button>
      </div>
      <Row gutter={[16, 16]} className="mt-8 image-container">
        {listImages?.map((item, index) => (
          <Col
            key={index}
            className="img-wrapper relative"
            sm={12}
            md={8}
            lg={6}
            xl={4}
          >
            <CloseCircleOutlined
              className="absolute top-[-10px] right-[-4px] z-10 cursor-pointer"
              onClick={onDeleteData(item)}
            />
            <div className="overflow-hidden h-[100%] w-[100%]">
              <Tooltip title={item?.name}>
                <span className="bg-green-200 text-black w-full inline-block p-3">
                  {renderLongString(item?.name, 15)}
                  <CopyFilled
                    className="ml-3 cursor-pointer"
                    onClick={onCopy(item?.path)}
                  />
                </span>
              </Tooltip>

              <Image
                src={axiosUtils.getFilePath({ url: item?.path })}
                alt={item?.name}
                height={"100%"}
                width={"100%"}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Pagination
        className="mt-12"
        current={state.page + 1}
        onChange={onPageSizeChange}
        pageSize={state.size}
        showSizeChanger={false}
        total={totalElements}
      />
      <ModalUploadMedia
        ref={modalUploadMediaRef}
        outsideChange={outsideChange}
      />
    </MediaPageWrapper>
  );
};

export default MediaPage;

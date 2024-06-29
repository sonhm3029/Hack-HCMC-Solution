import React, { useEffect, useRef } from "react";
import BasicPageWrapper from "./styled";
import useCustomState from "@/hooks/useCustomState";
import { Button, Popconfirm, Table, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TooltipButton from "../LabelDataPage/components/TooltipButton";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SUCCESS_CODE } from "@/constants/status_code";
import BasicEditModal from "./BasicEditModal";
import { loadingIndicatorRef } from "@/main";

const BasicPage = ({
  title = "",
  columns = [],
  dataAccessProvider,
  storeName,
  isReplaceColumns = false,
  ModalBody = () => <></>,
}) => {
  const [state, setState] = useCustomState({
    page: 0,
    size: 14,
    selectedRowKeys: [],

    modalType: "edit",
    modalCreateData: null,
    modalEditData: null,
  });

  const basicEditModalRef = useRef();

  const screenDim = useSelector((state) => state.style.screenDim);

  const { isLoading, listData, totalElements } = useSelector(
    (state) => state[storeName]
  );

  const search = useDispatch()[storeName].search;

  const onDeleteAllData = async () => {
    console.log(state.selectedRowKeys);
    await onDeleteData([...state?.selectedRowKeys])();
    setState({
      selectedRowKeys: [],
    });
  };

  const onPageChange = (page, pageSize) => {
    search({ page: page - 1, size: pageSize });
    setState({
      page: page - 1,
      size: pageSize,
    });
  };

  const defaultStartColumns = [];

  const onDeleteData = (body = []) => (_) => {
    return dataAccessProvider
      .delete(body)
      .then(async (res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          await search({ page: state?.page, size: state.size });
          notification.success({
            description: "Success delete data!",
          });
        } else {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        notification.error({
          description: err?.message || "Error delete data!",
        });
      });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setState({
      selectedRowKeys: [...newSelectedRowKeys],
    });
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };

  const defaultEndColumns = [
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (value, record, idx) => {
        return (
          <div className="flex items-center">
            <Popconfirm
              title="Xóa dữ liệu"
              description="Bạn có muốn xóa dữ liệu này?"
              onConfirm={onDeleteData([record?._id])}
            >
              <TooltipButton
                Icon={<DeleteOutlined className="delete-icon" />}
                title="Xóa dữ liệu"
              />
            </Popconfirm>
            <TooltipButton
              Icon={<EditOutlined className="blue-icon" />}
              title={"Chỉnh sửa dữ liệu"}
              onClick={onOpenModalEdit(record)}
            />
          </div>
        );
      },
    },
  ];

  const onOpenModalCreate = () => {
    setState({
      modalType: "create",
    });
    basicEditModalRef.current.show();
  };

  const onOpenModalEdit = (data) => (_) => {
    setState({
      modalType: "edit",
      modalEditData: data,
    });
    basicEditModalRef.current.show();
  };

  const onSubmitEditData = () => {
    let body = { ...state?.modalEditData };
    delete body["key"];

    let confirmSubmit = confirm("Bạn có chắc muốn thay đổi dữ liệu này");
    if (confirmSubmit) {
      loadingIndicatorRef.current.show();
      dataAccessProvider
        .update([body])
        .then((res) => {
          if (res?.data?.code === SUCCESS_CODE) {
            notification.success({
              description: "Thay đổi dữ liệu thành công",
            });
            search({ page: state?.page, size: state?.size });
            basicEditModalRef.current.hide();
          } else {
            throw new Error(res?.data?.message);
          }
        })
        .catch((err) => {
          notification.error({
            description: err?.message || "Lỗi thay đổi dữ liệu",
          });
        })
        .finally(() => {
          loadingIndicatorRef.current.hide();
        });
    }
  };

  const onSubmitCreateData = () => {
    loadingIndicatorRef.current.show();
    dataAccessProvider
      .create(state?.modalCreateData)
      .then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          notification.success({
            description: "Tạo mới dữ liệu thành công",
          });
          search({ page: state?.page, size: state?.size });
          setState({
            modalCreateData: null,
          });
          basicEditModalRef.current.hide();
        } else {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        notification.error({
          description: err?.message || "Lỗi tạo mới dữ liệu",
        });
      })
      .finally(() => {
        loadingIndicatorRef.current.hide();
      });
  };

  useEffect(() => {
    search({ page: state?.page, size: state?.size });
  }, []);

  return (
    <BasicPageWrapper className="basic-page-container p-4">
      <h1 className="basic-page-header text-left font-bold text-2xl mb-4">
        {title}
      </h1>
      <div className="flex justify-between">
        {state?.selectedRowKeys?.length > 0 && (
          <Popconfirm
            title="Xóa dữ liệu"
            description="Bạn có muốn xóa những dữ liệu này?"
            onConfirm={onDeleteAllData}
          >
            <Button className="text-white bg-red-600 border-none">
              Delete all
            </Button>
          </Popconfirm>
        )}
        <span className="font-bold">Tổng số dữ liệu: {totalElements}</span>
      </div>
      <div className="basic-page-table-function flex justify-between mt-5">
        <Button
          className="flex items-center"
          type="primary"
          onClick={onOpenModalCreate}
        >
          <PlusCircleOutlined /> Thêm mới dữ liệu
        </Button>
      </div>
      <Table
        className="basic-page-table mt-4"
        loading={isLoading}
        columns={
          isReplaceColumns
            ? columns
            : [...defaultStartColumns, ...columns, ...defaultEndColumns]
        }
        dataSource={listData?.map((item, idx) => ({
          ...item,
          key: item?._id,
        }))}
        scroll={{
          y: screenDim?.height > 760 ? 800 : 400,
        }}
        pagination={{
          current: state.page + 1,
          pageSize: state.size,
          onChange: onPageChange,
          showSizeChanger: false,
          total: totalElements,
        }}
        rowSelection={rowSelection}
      />
      <BasicEditModal
        modalRef={basicEditModalRef}
        type={state?.modalType}
        onSubmit={
          state?.modalType === "edit" ? onSubmitEditData : onSubmitCreateData
        }
      >
        <ModalBody
          data={
            state?.modalType === "edit"
              ? state?.modalEditData
              : state?.modalCreateData
          }
          setState={setState}
          type={state?.modalType}
        />
      </BasicEditModal>
    </BasicPageWrapper>
  );
};

export default BasicPage;

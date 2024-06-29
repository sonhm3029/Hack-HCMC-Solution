import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { ModalUploadMediaWrapper } from "./styled";
import { InboxOutlined } from "@ant-design/icons";
import { Input, Upload, message, notification } from "antd";
import useCustomState from "@/hooks/useCustomState";
import mediaProvider from "@/data-access/mediaProvider";
import { loadingIndicatorRef } from "@/main";
import { SUCCESS_CODE } from "@/constants/status_code";

const { Dragger } = Upload;
const { TextArea } = Input;

const ModalUploadMedia = ({ outsideChange = () => {}, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useCustomState({
    file: null,
  });

  useImperativeHandle(ref, () => ({
    show: _onOpen,
    hide: _onClose,
  }));

  const _onOpen = () => {
    setVisible(true);
  };

  const _onClose = (isReset = false) => {
    let confirmClose = confirm(
      "Bạn có chắc muốn đóng hộp thoại này, mọi dữ liệu sẽ bị mất!"
    );
    if (confirmClose) {
      if (isReset) {
        setState({
          file: null,
          listFileName: null,
          fileList: null,
        });
      }
      setVisible(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "",
    method: "GET",
    accept: "image/*",
    onChange: async (info) => {
      const { status } = info.file;
      setState({
        fileList: [...info.fileList],
      });
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setState({
          file: info.file.originFileObj,
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      //   setState({
      //     file: null,
      //     fileList: null,
      //   });
    },
    onRemove(e) {
      setState({
        file: null,
        fileList: null,
      });
    },
  };

  const onChangeListFileName = (e) => {
    setState({
      listFileName: e?.target?.value,
    });
  };

  const onSubmitUpload = () => {
    let check = confirm("Bạn có chắc muốn Upload các dữ liệu này lên chứ ?");
    if (check) {
      if (!state?.fileList?.length) {
        notification.error({
          description: "Bạn phải upload ít nhất một ảnh để tiếp tục",
        });
        return;
      }

      if (state?.fileList?.length !== state?.listFileName?.split(",")?.length) {
        notification.error({
          description:
            "Có vẻ bạn đặt tên sai cú pháp hoặc thiếu tên cho ảnh, vui lòng check lại!",
        });
        return;
      }

      let fileData = state?.fileList?.map((item) => ({
        key: "file",
        value: item?.originFileObj,
      }));

      let body = [{ key: "names", value: state?.listFileName }, ...fileData];

      loadingIndicatorRef.current.show();
      mediaProvider
        .create(body)
        .then((res) => {
          if (res?.data?.code === SUCCESS_CODE) {
            notification.success({
              description: "Upload thành công",
            });
            outsideChange();
            _onClose(true);
          } else {
            throw new Error(res?.data?.message);
          }
        })
        .catch((err) => {
          notification.error({
            description: err?.message || "Upload thất bại!",
          });
        })
        .finally(() => {
          loadingIndicatorRef.current.hide();
        });
    }
  };

  return (
    <ModalUploadMediaWrapper
      open={visible}
      onCancel={_onClose}
      title="Upload ảnh"
      onOk={onSubmitUpload}
      keyboard={false}
    >
      <p className="mt-8">
        Nhập vào tên các ảnh theo thứ tự upload, các tên cách nhau bằng dấu ","
      </p>
      <p className="mb-8">Ví dụ: Tên 1,Tên 2,Tên 3</p>
      <TextArea
        placeholder="Nhập vào tên ảnh"
        rows={4}
        className="mb-8"
        onChange={onChangeListFileName}
        value={state?.listFileName}
      />
      <Dragger {...uploadProps} fileList={state?.fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        {/* <p className="ant-upload-hint">
          File type must be <strong className="text-white">pdf</strong> and is{" "}
          <strong className="text-white">text file</strong>,{" "}
          <strong>not images pdf</strong> file!
        </p> */}
      </Dragger>
    </ModalUploadMediaWrapper>
  );
};

export default memo(forwardRef(ModalUploadMedia));

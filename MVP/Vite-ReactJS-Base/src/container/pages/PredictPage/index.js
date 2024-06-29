import React from "react";
import PredictPageWrapper from "./styled";
import Dragger from "antd/es/upload/Dragger";
import useCustomState from "@/hooks/useCustomState";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, notification } from "antd";
import { loadingIndicatorRef } from "@/main";
import aiProvider from "@/data-access/aiProvider";
import { SUCCESS_CODE } from "@/constants/status_code";

const PredictPage = () => {
  const [state, setState] = useCustomState({
    fileList: [],
  });
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
    },
    onRemove(e) {
      setState({
        file: null,
        fileList: null,
      });
    },
  };

  const onSubmit = () => {
    if (!state?.file) {
      notification.error({
        description: "Bạn phải upload file để tiếp tục",
      });
      return;
    }
    loadingIndicatorRef.current.show();
    aiProvider
      .predict({ key: "file", value: state?.file })
      .then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          console.log(res?.data?.data);
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
  return (
    <PredictPageWrapper className="p-4">
      <h1 className="font-bold text-xl mt-4 mb-6">
        Upload your image here to making prediction
      </h1>

      <Dragger {...uploadProps} fileList={state?.fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <Button type="primary" className="mt-3" onClick={onSubmit}>
        Submit
      </Button>
    </PredictPageWrapper>
  );
};

export default PredictPage;

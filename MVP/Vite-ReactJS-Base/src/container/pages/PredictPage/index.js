import React from "react";
import PredictPageWrapper from "./styled";
import Dragger from "antd/es/upload/Dragger";
import useCustomState from "@/hooks/useCustomState";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Image,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import { loadingIndicatorRef } from "@/main";
import aiProvider from "@/data-access/aiProvider";
import { SUCCESS_CODE } from "@/constants/status_code";
import axiosUtils from "@/utils/axios-utils";
import { RESULT_NAME_MAPPING } from "@/constants";
const { Meta } = Card;

const renderObject = (obj, indentLevel = 0) => {
  return (
    <div style={{ paddingLeft: `${indentLevel * 20}px` }}>
      {Object.entries(obj).map(([key, value], idx) => {
        if (
          key === "img_path" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return null;
        }

        if (Array.isArray(value) && value.length > 0) {
          value = value.join(", ");
        }

        return (
          <div key={idx}>
            <strong>{key.replace(/_/g, " ")}</strong>:{" "}
            {isObject(value) ? (
              <div>{renderObject(value, indentLevel + 1)}</div>
            ) : (
              <span>{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const isObject = (variable) => {
  return (
    variable !== null &&
    typeof variable === "object" &&
    !Array.isArray(variable)
  );
};

const extractDesiredImagePaths = (data) => {
  const result = {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const obj = data[key];
      const keys = Object.keys(obj);

      // Check if 'img_path' is present and not the only key
      if (
        obj.hasOwnProperty("img_path") &&
        obj["img_path"] &&
        keys.length > 1
      ) {
        result[key] = obj["img_path"];
      }
    }
  }

  return result;
};

const PredictPage = () => {
  const [state, setState] = useCustomState({
    fileList: [],
    predict_res: null,
    bc: 5,
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
          setState({ predict_res: res?.data?.data });
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

  const onChangeBC = (e) => {
    setState({ bc: e?.target?.value });
  };

  const renderResultBc = (data, bsc) => {
    let render_data;
    switch (bsc) {
      case 1:
        render_data = [
          {
            title: "human_detection_response",
            value: data["human_detection_response"],
          },
          {
            title: "drinking_human_response",
            value: data["drinking_human_response"],
          },
        ];
        break;
      case 2:
        render_data = [
          {
            title: "beer_advertise_detection",
            value: data["beer_advertise_detection"],
          },
        ];
        break;
      case 3:
        render_data = [
          {
            title: "human_detection_response",
            value: data["human_detection_response"],
          },
          { title: "llm_response", value: data["llm_response"] },
        ];
        break;
      case 4:
        render_data = [
          {
            title: "human_detection_response",
            value: data["human_detection_response"],
          },
        ];
        break;
      case 5:
        render_data = [
          {
            title: "beer_advertise_detection",
            value: data["beer_advertise_detection"],
          },
          {
            title: "beer_box_detection_response",
            value: data["beer_box_detection_response"],
          },
        ];
        break;
    }
    console.log("RENDER", render_data);

    return (
      <div>
        <h2 className="font-bold text-[16px]">Conclusion</h2>
        <div className="text-left">
          {render_data?.map((item, index) => (
            <div key={index} className="mb-4 model-response-present">
              <h2 className="font-bold text-[14px]">
                {RESULT_NAME_MAPPING[item?.title]}
              </h2>
              <div className="pl-4">
                {item?.value &&
                  Object.entries(item?.value)?.map(([key, value], idx) => {
                    if (item?.title === "drinking_human_response") {
                      if (key === "img_path") {
                        return <></>;
                      }
                      return (
                        <p>
                          <strong>{key}</strong>: {value?.human_count}
                        </p>
                      );
                    }
                    if (key === "img_path") {
                      return <></>;
                    }
                    if (Array.isArray(value) && value?.length == 0)
                      return <></>;
                    if (Array.isArray(value) && value?.length > 0)
                      value = value?.join(", ");

                    return (
                      value && (
                        <p>
                          <strong>{key}</strong>: {value}
                        </p>
                      )
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <PredictPageWrapper className="p-4">
      {state?.predict_res ? (
        <>
          <div className="flex">
            <Button
              type="primary"
              onClick={() => setState({ predict_res: null, fileList: [] })}
            >
              Return
            </Button>
            <h1 className="font-bold text-xl mb-4 ml-auto mr-auto">
              Prediction result
            </h1>
          </div>
          <div className="header-function mb-3">
            <Radio.Group onChange={onChangeBC} value={state.bc}>
              <Radio value={1}>Business case 1</Radio>
              <Radio value={2}>Business case 2</Radio>
              <Radio value={3}>Business case 3</Radio>
              <Radio value={4}>Business case 4</Radio>
              <Radio value={5}>Business case 5</Radio>
            </Radio.Group>
          </div>
          <div className="prediction-container flex">
            <Row className="prediction-present" gutter={[16, 16]}>
              {Object.entries(
                extractDesiredImagePaths(state?.predict_res)
              )?.map(([key, src], index) => (
                <Col sm={12} md={12} lg={12} xl={12} key={index + 1}>
                  <h2 className="mb-2 font-bold text-[16px]">
                    {RESULT_NAME_MAPPING[key]}
                  </h2>
                  <Image src={axiosUtils.getFilePath({ url: src })} />
                </Col>
              ))}
            </Row>
            <div className="prediction-result">
              {renderResultBc(state?.predict_res, state?.bc)}
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </PredictPageWrapper>
  );
};

export default PredictPage;

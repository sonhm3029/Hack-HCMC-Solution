import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import ViewExcelModalWrapper from "./styled";
import ExcelViewer from "../ExcelViewer";

const ViewExcelModal = ({ ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState(null);

  useImperativeHandle(ref, () => ({
    show: _onOpen,
    hide: _onClose,
  }));

  const _onOpen = (url) => {
    setVisible(true);
    console.log("VIEW URL", url)
    setUrl(url);
  };

  const _onClose = () => {
    setVisible(false);
  };

  return (
    <ViewExcelModalWrapper
      open={visible}
      onCancel={_onClose}
      footer={null}
      title=""
      width={"100%"}
    >
      {url ? <ExcelViewer fileUrl={url} /> : <></>}
    </ViewExcelModalWrapper>
  );
};

export default memo(forwardRef(ViewExcelModal));

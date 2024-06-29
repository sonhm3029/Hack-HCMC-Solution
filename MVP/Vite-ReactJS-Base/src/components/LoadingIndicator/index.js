import { Spin } from "antd";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const LoadingIndicatorContainer = styled.div``;

const LoadingIndicator = ({ ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: _onShow,
    hide: _onHide,
  }));

  const _onShow = () => {
    console.log("Here")
    setVisible(true);
  };

  const _onHide = () => {
    setVisible(false);
  };

  return (
    <>
      {visible ? (
        <LoadingIndicatorContainer className="z-[99999999] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <Spin size="large" tip="Please wait" />
        </LoadingIndicatorContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(forwardRef(LoadingIndicator));

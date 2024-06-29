import { Spin } from "antd";
import React from "react";
import Wrapper from "./styled";

const LoadingOverlay = ({ loadingSize = "large" }) => {
  return (
    <Wrapper className="flex items-center justify-center">
      <Spin size={loadingSize} />
    </Wrapper>
  );
};

export default LoadingOverlay;

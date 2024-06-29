import React from "react";
import { Button, Result } from "antd";
import { RouteName } from "@/routes/constants";
const DontHavePermissionPage = () => {
  const onGoToLogin = () => {
    location.href = RouteName.LOGIN_PATH;
  };
  return (
    <Result
      className="h-full flex justify-center flex-col"
      status={"warning"}
      title="You go wrong way"
      extra={
        <Button type="primary" key="console" onClick={onGoToLogin}>
          Go to Login
        </Button>
      }
    />
  );
};
export default DontHavePermissionPage;

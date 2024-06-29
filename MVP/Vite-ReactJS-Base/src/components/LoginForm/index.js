import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authProvider from "@/data-access/authProvider";
import { SUCCESS_CODE } from "@/constants/status_code";
import { Route } from "react-router-dom";
import { RouteName } from "@/routes/constants";
import { AUTH_KEY } from "@/constants";
import cacheProvider from "@/data-access/cache-provider";
const { Title } = Typography;

const LoginForm = () => {
  const onFinish = (values) => {
    // authProvider
    //   .login(values)
    //   .then((res) => {
    //     if (res?.data?.code === SUCCESS_CODE) {
    //       cacheProvider.save("", AUTH_KEY, {
    //         ...res?.data?.data,
    //         token: res?.data?.token,
    //       });
    //       notification.success({
    //         description: "Success logged in!",
    //       });

    //       setTimeout(() => {
    //         window.location.href = RouteName.DASHBOARD_PATH;
    //       }, 500);
    //     } else {
    //       throw new Error(res?.data?.message);
    //     }
    //   })
    //   .catch((err) => {
    //     notification.error({
    //       description: err?.message,
    //     });
    //   });
    window.location.href = RouteName.DASHBOARD_PATH;
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Handle password recovery logic here");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Handle registration logic here");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Login</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
            {/* <a
              style={{ float: "right" }}
              className="login-form-forgot"
              href=""
              onClick={handleForgotPassword}
            >
              Forgot password
            </a> */}
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-purple-700"
              block
              // onClick={() => {
              //   location.href = "/";
              // }}
            >
              Log in
            </Button>
            {/* Don't have an account{" "}
            <a href="" onClick={handleRegister}>
              sign up
            </a> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;

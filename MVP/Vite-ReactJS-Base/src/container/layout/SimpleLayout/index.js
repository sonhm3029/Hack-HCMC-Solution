import React, { useEffect } from "react";
import SimpleLayoutWrapper from "./styled";
import Header from "../Base/Header";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { Avatar, Button, Layout, Menu, notification } from "antd";
import {
  BarChartOutlined,
  BookOutlined,
  CloudOutlined,
  CommentOutlined,
  DatabaseOutlined,
  EditOutlined,
  FileImageOutlined,
  FrownOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ReadOutlined,
  RedditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RouteName } from "@/routes/constants";
import useCustomState from "@/hooks/useCustomState";
import { AUTH_KEY } from "@/constants";
import LogoHeineken from "@assets/ken_logo.jpg";

const { Sider } = Layout;

const SimpleLayout = () => {
  const [state, setState] = useCustomState({
    currentMenuKey: RouteName.DASHBOARD_PATH,
  });

  const navigate = useNavigate();
  const menuItems = [
    {
      key: RouteName.DASHBOARD_PATH,
      icon: <BarChartOutlined />,
      label: "Dashboard",
    },
    {
      key: RouteName.DATA_PAGE,
      icon: <CloudOutlined />,
      label: "Data collected",
    },
    {
      key: RouteName.PREDICT,
      icon: <RedditOutlined />,
      label: "Predict",
    },
    // {
    //   key: RouteName.INTENT_PAGE,
    //   icon: <DatabaseOutlined />,
    //   label: "Training data",
    // },
    // {
    //   key: RouteName.STORIES_PAGE,
    //   icon: <BookOutlined />,
    //   label: "Stories",
    // },
    // {
    //   key: RouteName.TRAINING_MODEL_PAGE,
    //   icon: <RedditOutlined />,
    //   label: "Training model",
    // },
    // {
    //   key: RouteName.TRAINING_HISTORY_PAGE,
    //   icon: <HistoryOutlined />,
    //   label: "Training history",
    // },
    // {
    //   key: RouteName.GUIDELINE_PAGE,
    //   icon: <ReadOutlined />,
    //   label: "Guideline",
    // },
    // {
    //   key: RouteName.USER_FEEDBACKS,
    //   icon: <CommentOutlined />,
    //   label: "User feedback",
    // },
    // {
    //   key: RouteName.MEDIA_PAGE,
    //   icon: <FileImageOutlined />,
    //   label: "Media",
    // },
    // {
    //   key: RouteName.RICH_TEXT_PAGE,
    //   icon: <EditOutlined />,
    //   label: "Richtext Editor",
    // },

    // {
    //   key: RouteName.CHATBOT_PATH,
    //   icon: <UserOutlined />,
    //   label: "Chatbot",
    // },
  ];

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log({ item, key, keyPath, selectedKeys, domEvent });
    setState({
      currentMenuKey: key,
    });
    navigate(key);
  };

  const onOpenChatbot = () => {
    window.open(RouteName.CHATBOT_PATH, "_blank");
  };

  const onLogout = () => {
    localStorage.clear(AUTH_KEY);
    notification.info({
      description: "You are logged out",
    });
    setTimeout(() => {
      window.location.href = RouteName.LOGIN_PATH;
    }, 500);
  };

  useEffect(() => {
    console.log(location.pathname);
    setState({
      currentMenuKey: location.pathname,
    });
  }, []);
  console.log(state?.currentMenuKey, "OK");

  return (
    <SimpleLayoutWrapper className="h-full">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical flex justify-center mt-3 mb-3">
          {/* <Avatar
            src={
              "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            }
          /> */}
          <img src={LogoHeineken} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[RouteName.DASHBOARD_PATH]}
          items={menuItems}
          onSelect={onMenuSelect}
          selectedKeys={[state.currentMenuKey]}
        />
        {/* <div className="flex-col flex items-center mt-8">
          <Button
            className="flex items-center bg-red-800 h-auto border-none text-white mt-4"
            onClick={onLogout}
          >
            <LogoutOutlined /> Logout
          </Button>
        </div> */}
      </Sider>
      <div id="page-body" className="ml-52 w-full overflow-y-auto">
        <Outlet />
      </div>
    </SimpleLayoutWrapper>
  );
};

export default SimpleLayout;

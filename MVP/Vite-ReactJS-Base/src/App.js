import "./App.css";
import "react-chatbot-kit/build/main.css";
import AppStyleWrapper from "./styled";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ComponentWrapper, LayoutDict, routeList } from "./routes";
import { ProtectedRoute } from "./routes/components";
import { RouteName } from "./routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { NO_LAYOUT } from "./container/layout";
import { Layout, notification } from "antd";
import { Fragment, useEffect } from "react";
import LoginPage from "./container/pages/Login";
import DontHavePermissionPage from "./container/pages/DontHavePermissionPage";

function App() {
  notification.config({
    maxCount: 1,
  });
  const handleResize = useDispatch()["style"].handleResize;

  useEffect(() => {
    handleResize();
    let windowResizeEvent = window.addEventListener("resize", handleResize);

    return function clean() {
      window.removeEventListener("resize", windowResizeEvent);
    };
  }, []);

  return (
    <AppStyleWrapper>
      <Routes>
        {Object.entries(LayoutDict).map(([layoutKey, layout]) => {
          let Layout = layout;
          if (layoutKey === NO_LAYOUT) {
            Layout = () => (
              <Fragment>
                <Outlet />
              </Fragment>
            );
          }
          return (
            <Route path="/" element={<Layout />} key={layoutKey}>
              {routeList
                ?.filter((item) => item.layout === layoutKey)
                .map((item, index) => {
                  let Page = item.component;
                  let path = item.path;
                  return (
                    <Route
                      key={item.path}
                      path={path}
                      element={
                        item?.private ? (
                          <ProtectedRoute>
                            <Page />
                          </ProtectedRoute>
                        ) : (
                          <Page />
                        )
                      }
                    />
                  );
                })}
            </Route>
          );
        })}

        <Route path="*" element={<Navigate to={RouteName.DASHBOARD_PATH} />} />
      </Routes>
    </AppStyleWrapper>
  );
}

export default App;

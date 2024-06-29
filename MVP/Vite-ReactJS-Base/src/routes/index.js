import { NO_LAYOUT, SIMPLE_LAYOUT } from "@/container/layout";
import { RouteName } from "./constants";

import Authorization from "@/container/pages/Authorization";
import React, { Suspense } from "react";
import SimpleLayout from "@/container/layout/SimpleLayout";

const Login = React.lazy(() => import("@pages/Login"));
const DashboardPage = React.lazy(() => import("@pages/DashboardPage"));
const MediaPage = React.lazy(() => import("@pages/MediaPage"));

const DataPage = React.lazy(() => import("@pages/DataPage"));
const PredictPage = React.lazy(() => import("@pages/PredictPage"));

export const ComponentWrapper = (Component, permissions) => (props) => {
  return (
    <Suspense fallback={<></>}>
      <Authorization permissions={permissions}>
        <Component {...props} />
      </Authorization>
    </Suspense>
  );
};

export const LayoutDict = {
  [SIMPLE_LAYOUT]: SimpleLayout,
  [NO_LAYOUT]: "",
};

const publicRoutes = [
  {
    path: RouteName.DATA_PAGE,
    component: ComponentWrapper(DataPage, []),
    layout: SIMPLE_LAYOUT,
  },
  {
    path: RouteName.PREDICT,
    component: ComponentWrapper(PredictPage, []),
    layout: SIMPLE_LAYOUT,
  }
];

const privateRoutes = [
  {
    path: RouteName.DASHBOARD_PATH,
    component: ComponentWrapper(DashboardPage, []),
    layout: SIMPLE_LAYOUT,
  },
  // {
  //   path: RouteName.MEDIA_PAGE,
  //   component: ComponentWrapper(MediaPage, []),
  //   layout: SIMPLE_LAYOUT,
  // }
];

export const routeList = [
  ...publicRoutes,
  ...privateRoutes.map((item) => ({
    ...item,
    private: true,
  })),
];

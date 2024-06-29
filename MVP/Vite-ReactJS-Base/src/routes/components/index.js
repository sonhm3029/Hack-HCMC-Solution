import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteName } from "../constants";
import cacheProvider from "@data-access/cache-provider";
import { AUTH_KEY } from "@constants";
import axiosUtils from "@utils/axios-utils";

export const ProtectedRoute = ({ children }) => {
  // Use when auth
  // const currentUser = cacheProvider.read("", AUTH_KEY);

  // Demo flow so set currentUser to true
  let currentUser = {token: "OK"};
  console.log("CURRENT USER", currentUser);

  if (currentUser) {
    axiosUtils.auth = "Bearer " + currentUser.token || "";
    return children;
  } else {
    return <Navigate to={RouteName.LOGIN_PATH} />;
  }
};

import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@redux/store";
import { RouteName } from "./routes/constants";
import LoadingIndicator from "./components/LoadingIndicator";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const loadingIndicatorRef = createRef();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <LoadingIndicator ref={loadingIndicatorRef} />
      </BrowserRouter>
    </Provider>
  );
};

root.render(<Root />);

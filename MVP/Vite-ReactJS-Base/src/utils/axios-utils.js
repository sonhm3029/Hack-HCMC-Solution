import { PREFIX } from "@/constants/api";
import { RouteName } from "@/routes/constants";
import axios from "axios";

export const UrlServer = () => {
  const domain = location.origin;

  switch (domain) {
    case "http://localhost:5173":
      return "https://9485-101-53-1-124.ngrok-free.app";
  }
};

export const URLWebsocket = () => {
  const domain = location.origin;

  switch (domain) {
    case "http://localhost:5173":
      return "ws://localhost:8008/ws/training/";
  }
};

const axiosUtils = {
  auth: "",
  serverApi: UrlServer(),
  requestAxios({
    method = "",
    url = "",
    params = {},
    data,
    ignoreAuth = true,
    isUseServiceUrl = false,
    isUpload = false,
    customContentType,
    ...rest
  }) {
    url = isUseServiceUrl ? this.serverApi + url : url;
    return new Promise((resolve, reject) => {
      let contentType =
        customContentType ||
        (isUpload ? "multipart/form-data" : "application/json");
      if (isUpload) {
        const formData = new FormData();
        if (data?.length) {
          data.forEach(({ key, value }) => {
            formData.append(key, value);
          });
        } else {
          formData.append(data?.key, data?.value);
        }
        data = formData;
      }

      let headers = ignoreAuth
        ? { "Content-Type": contentType, "ngrok-skip-browser-warning": true }
        : {
            "Content-Type": contentType,
            Authorization: this.auth,
            "ngrok-skip-browser-warning": true,
          };
      axios({
        method,
        url,
        params,
        data,
        headers,
        ...rest,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          if (
            err?.response?.data?.detail ===
              "Authentication credentials were not provided" ||
            err?.response?.status === 403 ||
            err?.response?.status === 401
          ) {
            window.location.href = RouteName.LOGIN_PATH;
          }
          reject(err);
        });
    });
  },
  getFilePath({ url }) {
    return this.serverApi + PREFIX + "/" + url;
  },
};

export default axiosUtils;

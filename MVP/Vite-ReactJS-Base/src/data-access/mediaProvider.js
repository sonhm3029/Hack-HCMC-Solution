import API_VAR from "@constants/api";
import axiosUtils from "@utils/axios-utils";

const mediaProvider = {
  search: async (params) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "GET",
          url: API_VAR.MEDIA.SEARCH,
          ignoreAuth: false,
          isUseServiceUrl: true,
          params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  create: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "POST",
          url: API_VAR.MEDIA.CREATE,
          ignoreAuth: false,
          isUseServiceUrl: true,
          data: body,
          isUpload: true
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delete: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "DELETE",
          url: API_VAR.MEDIA.DELETE,
          ignoreAuth: false,
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default mediaProvider;

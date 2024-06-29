import axiosUtils from "@utils/axios-utils";

export const renderBasicMethod = (
  listMethod = [{ functionName: "", method: "", api: "" }]
) => {
  let result = listMethod?.reduce((final, item) => {
    final[item.functionName] = function(data, params) {
      return new Promise((resolve, reject) => {
        axiosUtils
          .requestAxios({
            method: item.method,
            url: item.api,
            ignoreAuth: false,
            isUseServiceUrl: true,
            data,
            params,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    };

    return final;
  }, {});

  return result;
};

export const basicProvider = (baseUrl = "") => ({
  create(data) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "POST",
          url: baseUrl,
          ignoreAuth: false,
          isUseServiceUrl: true,
          data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  search(params = {}) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "GET",
          url: baseUrl,
          ignoreAuth: false,
          isUseServiceUrl: true,
          params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  delete: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "DELETE",
          url: baseUrl,
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
  update: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "PUT",
          url: baseUrl,
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
});

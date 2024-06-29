import API_VAR from "@constants/api";
import axiosUtils from "@utils/axios-utils";

const authProvider = {
  login: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "POST",
          url: API_VAR.AUTH.LOGIN,
          ignoreAuth: true,
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

export default authProvider;

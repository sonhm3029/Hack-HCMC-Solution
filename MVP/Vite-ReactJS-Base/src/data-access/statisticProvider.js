import API_VAR from "@constants/api";
import axiosUtils from "@utils/axios-utils";

const statisticProvider = {
  get: async (params) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "GET",
          url: API_VAR.STATISTICS.BASE,
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
};

export default statisticProvider;

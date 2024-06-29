import API_VAR from "@constants/api";
import axiosUtils from "@utils/axios-utils";

const dataProvider = {
  search: async (params) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "GET",
          url: API_VAR.COLLECTED_DATA.BASE,
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

export default dataProvider;

import API_VAR from "@constants/api";
import axiosUtils from "@utils/axios-utils";

const aiProvider = {
  predict: async (body) => {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          method: "POST",
          url: API_VAR.PREDICT.BASE,
          ignoreAuth: false,
          isUseServiceUrl: true,
          data: body,
          isUpload: true,
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

export default aiProvider;

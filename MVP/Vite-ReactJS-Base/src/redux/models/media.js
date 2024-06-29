import { SUCCESS_CODE } from "@/constants/status_code";
import mediaProvider from "@/data-access/mediaProvider";

const initState = {
  listData: [],
  isLoading: false,
  totalElements: 0,
};
const media = {
  state: initState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    resetData(state) {
      return { ...initState, isAllowBiometrics: state.isAllowBiometrics };
    },
  },
  effects: (dispatch) => ({
    search: async (payload, state) => {
      try {
        let page = payload?.page;
        let size = payload?.size;
        let name = payload?.name || null;
        dispatch.media.updateData({
          isLoading: true,
        });
        let res = await mediaProvider.search({
          page,
          size,
          name,
        });

        if (res?.data?.code === SUCCESS_CODE) {
          dispatch.media.updateData({
            listData: [...res?.data?.data],
            totalElements: res?.data?.totalElements,
            isLoading: false,
          });
        } else {
          throw new Error(res?.data?.message);
        }
      } catch (error) {
        dispatch.media.updateData({
          isLoading: false,
        });
        console.log("ERROR QUery media", error?.message);
      }
    },
  }),
};

export default media;

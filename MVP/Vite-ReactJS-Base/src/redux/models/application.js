import { SUCCESS_CODE } from "@/constants/status_code";

const initState = {
  listData: [],
  isLoading: false,
  totalElements: 0,
  data: null,
};
const application = {
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
  }),
};

export default application;

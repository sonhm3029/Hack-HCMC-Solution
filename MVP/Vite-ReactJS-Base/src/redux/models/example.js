const initState = {
  listData: ["ok", "oki"],
};
const examples = {
  state: initState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    resetData(state) {
      return { ...initState, isAllowBiometrics: state.isAllowBiometrics };
    },
  },
  effects: (dispatch) => ({}),
};

export default examples;

const initState = {
  screenDim: null,
};
const style = {
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
    handleResize: (payload, state) => {
      dispatch.style.updateData({
        screenDim: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    },
  }),
};

export default style;

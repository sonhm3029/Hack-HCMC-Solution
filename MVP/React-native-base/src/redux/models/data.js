const initState = {
  listData: ['ok', 'oki'],
  currentPhotoPath: null,
};
const data = {
  state: initState,
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
    resetData(state) {
      return {...initState, isAllowBiometrics: state.isAllowBiometrics};
    },
  },
  effects: dispatch => ({}),
};

export default data;
import { SUCCESS_CODE } from "@constants/status_code";

const storeInstance = ({
  storeName,
  fetchProvider,
  initStore = { listData: [] },
  customEffect = () => ({}),
}) => ({
  state: {
    listData: [],
    totalElements: 0,
    isLoadData: false,
    ...initStore,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    updateNestedData(state, payload = {}) {
      let keys = Object.keys(payload);
      let map = keys?.reduce((obj, key) => {
        obj[key] = {
          ...state[key],
          ...payload[key],
        };
        return obj;
      }, {});
      return {
        ...state,
        ...map,
      };
    },
    resetData(state) {
      return { ...initStore };
    },
  },
  effects: (dispatch) => ({
    dummy: (payload, state) => {},
    create: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetchProvider.create(payload);

          if (res?.data?.code === SUCCESS_CODE) {
            resolve(res?.data?.data);
          } else {
            throw new Error(res?.data?.message);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    search: (payload, state) => {
      let params = payload || {};
      return new Promise(async (resolve, reject) => {
        try {
          dispatch[storeName].updateData({
            isLoadData: true,
          });
          let res = await fetchProvider.search(params);

          if (res?.data?.code === SUCCESS_CODE) {
            dispatch[storeName].updateData({
              listData: res?.data?.data,
              totalElements: res?.data?.totalElements,
              isLoadData: false,
            });
            resolve(res?.data?.data);
          } else {
            throw new Error(res?.data?.message);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    ...customEffect({ dispatch }),
  }),
});

export default storeInstance;

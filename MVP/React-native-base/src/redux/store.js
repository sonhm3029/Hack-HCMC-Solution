import {init} from '@rematch/core';
import * as models from './models';

const store = init({
  models,
});

// const getState = store.getState;
// export {getState};
export default store;

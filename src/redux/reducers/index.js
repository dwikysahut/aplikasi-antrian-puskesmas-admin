/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/lib/constants';
import reducerUser from './reducerUser';

const combinedReducers = combineReducers({ reducerUser });
const rootReducer = (state, action) => {
  if (action.type === REHYDRATE) {
    state = action.payload;
  }
  return combinedReducers(state, action);
};
export default rootReducer;

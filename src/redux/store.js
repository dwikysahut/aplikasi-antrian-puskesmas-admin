import { legacy_createStore as createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allReducers from './reducers';

const logger = createLogger();
const enhancer = applyMiddleware(promiseMiddleware, logger);
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    '_persist',
  ],
};
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

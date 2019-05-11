import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loadingReducer from './loadingReducer';
import authReducer from '../features/authentication/authReducer';
import createBucketListReducer from '../features/feed/Reducers/createBucketListReducer';
import fetchBucketListReducer from '../features/feed/Reducers/fetchBucketListReducer';

const reducer = combineReducers({
  loadingReducer,
  authReducer,
  createBucketListReducer,
  fetchBucketListReducer,
});

let middleware = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'authReducer',
  ]
};

const persistedReducer = persistReducer(persistConfig, reducer);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
};

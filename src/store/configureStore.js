import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import login from './login';
import movies from './movies';
import localStorage from './middleware/localStorage';

const middleware = [...getDefaultMiddleware(), localStorage];

const reducer = combineReducers({ login, movies });
const store = configureStore({ reducer, middleware });

export default store;

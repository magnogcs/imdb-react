import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helper/createAsyncSlice';
import getLocalStorage from './helper/getLocalStorage';
import { removeMovies } from './movies';


//Create reducer to Token
const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token: getLocalStorage('token', null),
    },
  },

  reducers: {
    removeToken(state) {
      state.data = null;
    },
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: 'token',
              value: payload.request_token,
            },
          },
        };
      },
    },
  },

  fetchConfig: () => ({
    url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=1f07962b087ee5358f9eea839ec9f56c',
    options: {
      method: 'GET',
    },
  }),
});

//Create reducer to User - In this project is not necessary because this API no need to save users data, but I kept it to maintain the structure
const user = createAsyncSlice({
  name: 'user',
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: () => ({
    url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=1f07962b087ee5358f9eea839ec9f56c',
    options: {
      method: 'GET',
    },
  }),
});

const reducer = combineReducers({ token: token.reducer, user: user.reducer });
const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;

const { removeToken } = token.actions;
const { removeUser } = user.actions;

export default reducer;

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user));
    if (payload.request_token !== undefined) await dispatch(fetchUser(payload.request_token));
  } catch {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.login.token.data;
  if (token) await dispatch(fetchUser(token));
};

export const userLogout = () => (dispatch) => {
  dispatch(removeUser());
  dispatch(removeToken());
  dispatch(removeMovies());
  window.localStorage.removeItem('token');
};

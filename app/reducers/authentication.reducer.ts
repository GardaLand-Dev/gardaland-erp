import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk, history } from '../store';
import userService from '../services/user.service';

type AuthState = {
  loggedIn?: boolean;
  logginIn?: boolean;
  user?: any;
};

const user = JSON.parse(localStorage.getItem('user'));
const initialState: AuthState = user ? { loggedIn: true, user } : {};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userLoginRequest: (state, { payload }) => {
      state.logginIn = true;
      state.user = payload;
      // return { logginIn: true, user: payload };
    },
    userLoginSuccess: (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;
      // return { loggedIn: true, user: payload };
    },
    userLoginFailure: (state) => {
      state.loggedIn = null;
      state.logginIn = null;
      state.user = null;
    },
    userLogout: (state) => {
      state.loggedIn = null;
      state.logginIn = null;
      state.user = null;
    },
  },
});

export const {
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
} = authenticationSlice.actions;

export const login = (user_name, password): AppThunk => {
  return (dispatch) => {
    dispatch(userLoginRequest(user_name));
    userService
      .login(user_name, password)
      .then((userData) => {
        dispatch(userLoginSuccess(userData));
        // redirecting
        history.push('/');
        return userData;
      })
      .catch(() => {
        dispatch(userLoginFailure());
      });
  };
};

export const logout = (): AppThunk => {
  return (dispatch) => {
    dispatch(userLogout());
    userService.logout();
  };
};

export default authenticationSlice.reducer;

export const selectLoggedIn = (state: RootState) =>
  state.authentication.loggedIn;

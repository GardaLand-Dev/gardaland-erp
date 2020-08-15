import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk, history } from '../store';
import userService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userLoginRequest: (_state, { payload }) => {
      return { logginIn: true, user: payload };
    },
    userLoginSuccess: (_state, { payload }) => {
      return { loggedIn: true, user: payload };
    },
    userLoginFailure: () => {
      return {};
    },
    userLogout: () => {
      return {};
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
    dispatch(userLogout);
    userService.logout();
  };
};

export default authenticationSlice.reducer;

export const selectLoggedIn = (state: RootState) =>
  state.authentication.loggedIn;

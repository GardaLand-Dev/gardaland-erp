import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk, history } from '../store';
import userService from '../services/user.service';
import { getDecoded } from '../helpers/auth-header';

type AuthState = {
  loggedIn?: boolean;
  logginIn?: boolean;
  user?: any;
  hasManagerRole?: boolean;
  asManager?: boolean;
};

const user = getDecoded();
const man = JSON.parse(localStorage.getItem('loggedInfo'));
const initialState: AuthState = user
  ? {
      loggedIn: true,
      user,
      hasManagerRole: man && man.hasManagerRole,
      asManager: man && man.asManager,
    }
  : {};

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
    userLoginRolePrompt: (state) => {
      state.hasManagerRole = true;
    },
    userLoginFailure: (state) => {
      state.loggedIn = null;
      state.logginIn = null;
      state.user = null;
      state.asManager = null;
      state.hasManagerRole = null;
    },
    userLogout: (state) => {
      state.loggedIn = null;
      state.logginIn = null;
      state.user = null;
      state.asManager = null;
      state.hasManagerRole = null;
    },
    setAsManager: (state) => {
      state.asManager = true;
    },
  },
});

export const {
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userLoginRolePrompt,
  userLogout,
  setAsManager,
} = authenticationSlice.actions;

export const selectAuthState = (state: RootState) => state.authentication;

export const selectLoggedIn = (state: RootState) =>
  state.authentication.loggedIn;

export const selecthasManagerRole = (state: RootState) =>
  state.authentication.hasManagerRole;

export const login = (user_name, password): AppThunk => {
  return (dispatch) => {
    dispatch(userLoginRequest(user_name));
    userService
      .login(user_name, password)
      .then((userData) => {
        // redirecting
        if (
          userData &&
          userData.roles
            .map((role) => role.name.toLowerCase())
            .indexOf('admin') > -1
        ) {
          dispatch(userLoginRolePrompt());
        } else {
          dispatch(userLoginSuccess(userData));
          history.push('/');
        }
        return userData;
      })
      .catch((e) => {
        console.log(e);
        dispatch(userLoginFailure());
      });
  };
};
export const loginAsManager = (user_name, password): AppThunk => {
  return (dispatch) => {
    dispatch(userLoginRequest(user_name));
    userService
      .login(user_name, password)
      .then((userData) => {
        if (
          userData &&
          userData.roles
            .map((role) => role.name.toLowerCase())
            .indexOf('admin') > -1
        ) {
          dispatch(userLoginSuccess(userData));
          dispatch(setAsManager());
          // updating localstorage
          localStorage.setItem(
            'loggedInfo',
            JSON.stringify({
              hasManagerRole: true,
              asManager: true,
            })
          );
          history.push('/');
          return userData;
        }
        throw new Error('coudnt sign in');
      })
      .catch((e) => {
        console.log(e);
        dispatch(userLoginFailure());
      });
  };
};

export const loginAsCaissier = (user_name, password): AppThunk => {
  return (dispatch) => {
    dispatch(userLoginRequest(user_name));
    userService
      .login(user_name, password)
      .then((userData) => {
        if (userData) {
          dispatch(userLoginSuccess(userData));
          history.push('/');
          return userData;
        }
        throw new Error('coudnt sign in');
      })
      .catch((e) => {
        console.log(e);
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

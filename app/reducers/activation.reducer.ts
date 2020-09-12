import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk, history } from '../store';
import activationService from '../services/activation.service';

type AppState = {
  activating?: boolean;
  activated: boolean;
};

const app: { activated: boolean } = JSON.parse(
  localStorage.getItem('activationState')
);

const initialState: AppState = app
  ? {
      activated: app.activated,
    }
  : undefined;

const authenticationSlice = createSlice({
  name: 'activation',
  initialState,
  reducers: {
    activationRequest: (state) => {
      state.activating = true;
      // return { logginIn: true, user: payload };
    },
    activationSuccess: (state) => {
      state.activated = true;
      // return { loggedIn: true, user: payload };
    },
    activationFailure: (state) => {
      state.activated = false;
      state.activating = null;
    },
  },
});

export const {
  activationFailure,
  activationRequest,
  activationSuccess,
} = authenticationSlice.actions;

export const selectAppState = (state: RootState) => state.appState;

export const selectActivated = (state: RootState) => state.appState.activated;

export const activate = (apikey: string): AppThunk => {
  return (dispatch) => {
    dispatch(activationRequest());
    activationService
      .activate(apikey)
      .then((appstate) => {
        // redirecting
        if (appstate && appstate.activated === true) {
          dispatch(activationSuccess());
        } else {
          dispatch(activationFailure());
          history.push('/');
        }
        return appstate;
      })
      .catch((e) => {
        console.log(e);
        dispatch(activationFailure());
      });
  };
};

export default authenticationSlice.reducer;

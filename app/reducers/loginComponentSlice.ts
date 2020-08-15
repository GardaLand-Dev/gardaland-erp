import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const loginComponentSlice = createSlice({
  name: 'loginComponent',
  initialState: {
    user_name: '',
    password: '',
    submitted: false,
  },
  reducers: {
    submit: (state) => {
      state.submitted = true;
    },
    setUser: (state, { payload }) => {
      state.user_name = payload;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
  },
});
export const { submit, setUser, setPassword } = loginComponentSlice.actions;

export default loginComponentSlice.reducer;

export const selectLoginState = (state: RootState) => state.loginComponent;

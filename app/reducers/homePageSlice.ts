import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const initSelectedFam = '';

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    selectedFamily: initSelectedFam,
  },
  reducers: {
    selectFamily: (_state, { payload }) => {
      return { selectedFamily: payload };
    },
  },
});

export const { selectFamily } = homePageSlice.actions;

export default homePageSlice.reducer;

export const selectSelectedFamily = (state: RootState) =>
  state.homePage.selectedFamily;

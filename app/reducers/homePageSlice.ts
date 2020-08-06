import { createSlice } from '@reduxjs/toolkit';
import data from '../services/api';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const initSelectedFam = data.families[0].id;

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

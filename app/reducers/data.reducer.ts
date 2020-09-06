import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const initialState: {
  data?: {
    id: string;
    name: string;
    stationId: string;
    products?: {
      id: string;
      name: string;
      tva: number;
      priceTTC: number;
      familyId: string;
      maxQuantity: string;
    }[];
  }[];
} = {};

const familiesDataSlice = createSlice({
  name: 'familiesData',
  initialState,
  reducers: {
    updateData: (_state, { payload }) => {
      return { data: payload };
    },
  },
});

export const { updateData } = familiesDataSlice.actions;

export default familiesDataSlice.reducer;

export const selectData = (state: RootState) => state.familiesData.data;

import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

export type Suppliment = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  priceTTC: number;
};

type Row = {
  index: number;
  product: Product;
  q: number;
  suppliments: { suppliment: Suppliment; q: number }[];
};

// type List = {
//   tab: number;
//   rows: Row[];
// };

const rws: Row[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    lists: [{ tab: 1, rows: rws }],
    selectedTab: 1,
    selectedArticle: -1,
  },
  reducers: {
    addArticle: (state, { payload }) => {
      const product: Product = payload;
      const list = state.lists.find((lst) => lst.tab === state.selectedTab);
      if (list) {
        const index =
          list.rows.length === 0
            ? 1
            : list.rows[list.rows.length - 1].index + 1;
        list.rows.push({ index, product, q: 1, suppliments: [] });
      }
    },
    delArticle: (state, { payload }) => {
      const index: number = payload;
      const list = state.lists.find((lst) => lst.tab === state.selectedTab);
      if (list) {
        list.rows = list.rows.filter((row) => row.index !== index);
      }
    },
    incrQuantity: (state, { payload }) => {
      const index: number = payload;
      const list = state.lists.find((lst) => lst.tab === state.selectedTab);
      if (list) {
        const row = list.rows.find((rw) => rw.index === index);
        if (row) row.q += 1;
      }
    },
    decQuantity: (state, { payload }) => {
      const index: number = payload;
      const list = state.lists.find((lst) => lst.tab === state.selectedTab);
      if (list) {
        const row = list.rows.find((rw) => rw.index === index);
        if (row && row.q > 1) row.q -= 1;
      }
    },
    setQuantity: (state, { payload }) => {
      const { index, value }: { index: number; value: number } = payload;
      const list = state.lists.find((lst) => lst.tab === state.selectedTab);
      if (list && value > 0) {
        const row = list.rows.find((rw) => rw.index === index);
        if (row && row.q > 1) row.q = value;
      }
    },
    addSuppliment: (state, { payload }) => {
      // TODO: revise this maybe false
      const { index } = payload;
      if (state.selectedArticle > -1) {
        const list = state.lists.find((lst) => lst.tab === state.selectedTab);
        if (list) {
          const row = list.rows.find((rw) => rw.index === index);
          if (row)
            row.suppliments.push({ suppliment: payload.suppliment, q: 1 });
        }
      }
    },
    delSuppliment: (state, { payload: { suppliment } }) => {
      if (state.selectedArticle > -1) {
        const list = state.lists.find((lst) => lst.tab === state.selectedTab);
        if (list) {
          const row = list.rows.find(
            (rw) => rw.index === state.selectedArticle
          );
          if (row)
            row.suppliments = row.suppliments.filter(
              (supp) => supp.suppliment.id !== suppliment.id
            );
        }
      }
    },
    incrSuppliment: (state, { payload: { suppliment } }) => {
      if (state.selectedArticle > -1) {
        const list = state.lists.find((lst) => lst.tab === state.selectedTab);
        if (list) {
          const row = list.rows.find((_row, i) => i === state.selectedArticle);
          if (row) {
            const supp = row.suppliments.find(
              (s) => s.suppliment.id === suppliment.id
            );
            if (supp) supp.q += 1;
          }
        }
      }
    },
    decSuppliment: (state, { payload }) => {
      if (state.selectedArticle > -1) {
        const list = state.lists.find((lst) => lst.tab === state.selectedTab);
        if (list) {
          const row = list.rows.find((_row, i) => i === payload.index);
          if (row) {
            const suppliment = row.suppliments.find(
              (supp) => supp.suppliment.id === payload.suppliment.id
            );
            if (suppliment && suppliment.q > 1) {
              suppliment.q -= 1;
            }
          }
        }
      }
    },
    addList: (state) => {
      if (state.lists.length === 4) return state;
      const tabnum = state.lists[state.lists.length - 1].tab + 1;
      return {
        ...state,
        lists: [...state.lists, { tab: tabnum, rows: [] }],
        selectedTab: tabnum,
      };
    },
    delList: (state) => {
      if (state.selectedTab === 1) {
        const lst = state.lists.find((list) => list.tab === 1);
        if (lst) lst.rows = [];
      } else {
        const index = state.lists.findIndex(
          (lst) => lst.tab === state.selectedTab
        );
        state.lists = state.lists.filter(
          (lst) => lst.tab !== state.selectedTab
        );
        // change selectedTab
        const tabnum =
          index > state.lists.length - 1
            ? state.lists[state.lists.length - 1].tab
            : state.lists[index].tab;
        state.selectedTab = tabnum;
      }
    },
    selectTab: (state, { payload }) => {
      state.selectedTab = payload;
    },
  },
});

export const {
  addArticle,
  delArticle,
  incrQuantity,
  decQuantity,
  setQuantity,
  addSuppliment,
  delSuppliment,
  incrSuppliment,
  decSuppliment,
  addList,
  delList,
  selectTab,
} = cartSlice.actions;

export const incOrAddSuppliment = (suppliment: Suppliment): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (
      state.cart.lists
        .find((lst) => lst.tab === state.cart.selectedTab)
        ?.rows.find((_row, i) => i === state.cart.selectedArticle)
        ?.suppliments.find((sup) => sup.suppliment.id === suppliment.id)
    ) {
      dispatch(incrSuppliment({ suppliment }));
    } else {
      dispatch(addSuppliment({ suppliment }));
    }
  };
};

export const decOrDelSuppliment = (suppliment: Suppliment): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const list = state.cart.lists.find(
      (lst) => lst.tab === state.cart.selectedTab
    );
    if (list) {
      const row = list.rows.find((_row, i) => i === state.cart.selectedArticle);
      if (row) {
        const supp = row.suppliments.find(
          (sup) => sup.suppliment.id === suppliment.id
        );
        if (supp && supp.q > 1) {
          dispatch(decSuppliment({ suppliment }));
        } else {
          dispatch(delSuppliment({ suppliment }));
        }
      }
    }
  };
};

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;

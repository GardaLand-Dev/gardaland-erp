import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import cartReducer from './reducers/cartSlice';
// eslint-disable-next-line import/no-cycle
import homePageReducer from './reducers/homePageSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    cart: cartReducer,
    homePage: homePageReducer,
  });
}

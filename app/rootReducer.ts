/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import cartReducer from './reducers/cartSlice';
import homePageReducer from './reducers/homePageSlice';
import authenticationReducer from './reducers/authentication.reducer';
import loginComponentReducer from './reducers/loginComponentSlice';
import familiesDataReducer from './reducers/data.reducer';
import activationReducer from './reducers/activation.reducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    cart: cartReducer,
    homePage: homePageReducer,
    authentication: authenticationReducer,
    loginComponent: loginComponentReducer,
    familiesData: familiesDataReducer,
    appState: activationReducer,
  });
}

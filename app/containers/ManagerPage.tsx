import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/manager/SideBar';
import routes from '../constants/routes.json';
import ProductList from '../components/manager/features/product/ProductList';
import FamilleList from '../components/manager/features/Famille/FamilleList';
import VenteList from '../components/manager/features/Vente/VenteList';
import StockList from '../components/manager/features/Stock/StockList';
import Station from '../components/manager/features/Station/Station';

export default function MangerPage(): JSX.Element {
  return (
    <div className="d-flex flex-row w-100 h-100 ">
      <div className="h-100 managerSideBar of-x-auto">
        <SideBar />
      </div>
      <div className="d-flex flex-column flex-grow-1 h-100 theme-background">
        <Header />
        <div className="flex-grow-1 mt-3 mx-3 ">
          {/* Features */}
          <Route
            path={routes.MANAGER.ProductManagement.List}
            component={ProductList}
          />
          <Route
            path={routes.MANAGER.ProductManagement.FamilleList}
            component={FamilleList}
          />
          <Route
            path={routes.MANAGER.ProductManagement.Station}
            component={Station}
          />
          <Route
            path={routes.MANAGER.VenteManagement.List}
            component={VenteList}
          />
          <Route
            path={routes.MANAGER.StockManagement.List}
            component={StockList}
          />
          <Route
            path={routes.MANAGER.root}
            render={() => (
              <Redirect to={routes.MANAGER.ProductManagement.List} />
            )}
            exact
          />
        </div>
      </div>
    </div>
  );
}

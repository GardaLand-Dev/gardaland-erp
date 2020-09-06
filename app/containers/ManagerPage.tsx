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
import Expense from '../components/manager/features/Achat/Expense';
import Facture from '../components/manager/features/Achat/Facture';
import StockFacture from '../components/manager/features/Stock/StockFacture';
import Account from '../components/manager/features/finance/Account';
import Users from '../components/manager/features/Personnes/Users';
import Clients from '../components/manager/features/Personnes/Clients';
import Fournisseurs from '../components/manager/features/Personnes/Fournisseurs';
import Employee from '../components/manager/features/GRH/Employee';
import Payroll from '../components/manager/features/GRH/Payroll';
import Attendance from '../components/manager/features/GRH/Attendance';
import StockDamage from '../components/manager/features/Stock/StockDamage';

export default function MangerPage(): JSX.Element {
  return (
    <div className="d-flex flex-row w-100 h-100 ">
      <div className="h-100 managerSideBar of-x-auto theme-gradient-y">
        <SideBar />
      </div>
      <div className="d-flex flex-column flex-grow-1 h-100 theme-background">
        <div className="m-3 p-0">
          <Header />
        </div>
        <div className="flex-grow-1 mx-3 ">
          {/* Features */}
          <Route
            path={routes.MANAGER.ProductManagement.ProductList}
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
          <Route path={routes.MANAGER.Achat.Expense} component={Expense} />
          <Route path={routes.MANAGER.Achat.Facture} component={Facture} />
          <Route
            path={routes.MANAGER.StockManagement.Facture}
            component={StockFacture}
          />
          <Route
            path={routes.MANAGER.FinanceManagement.Account}
            component={Account}
          />
          <Route
            path={routes.MANAGER.PersonnesManagement.Users}
            component={Users}
          />
          <Route
            path={routes.MANAGER.PersonnesManagement.Clients}
            component={Clients}
          />
          <Route
            path={routes.MANAGER.PersonnesManagement.Fournisseurs}
            component={Fournisseurs}
          />
          <Route
            path={routes.MANAGER.HumanResourceManagement.Employee}
            component={Employee}
          />
          <Route
            path={routes.MANAGER.HumanResourceManagement.Payroll}
            component={Payroll}
          />
          <Route
            path={routes.MANAGER.HumanResourceManagement.Attendance}
            component={Attendance}
          />
          <Route
            path={routes.MANAGER.VenteManagement.root}
            component={VenteList}
          />
          <Route
            path={routes.MANAGER.StockManagement.List}
            component={StockList}
          />
          <Route
            path={routes.MANAGER.StockManagement.Damaged}
            component={StockDamage}
          />
          <Route
            path={routes.MANAGER.root}
            render={() => (
              <Redirect to={routes.MANAGER.ProductManagement.ProductList} />
            )}
            exact
          />
        </div>
      </div>
    </div>
  );
}

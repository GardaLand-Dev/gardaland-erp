import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/manager/SideBar';
import routes from '../constants/routes.json';
import MenuManagement from '../components/manager/features/MenuManagement';
import StaffManagement from '../components/manager/features/StaffManagement';

export default function MangerPage(): JSX.Element {
  return (
    <div className="d-flex flex-row w-100 h-100 border border-primary">
      <div className="h-100 border border-secondary managerSideBar">
        <SideBar />
      </div>
      <div className="d-flex flex-column flex-grow-1 h-100 border border-secondary">
        <Header />
        <div className="flex-grow-1 mt-3 mx-3">
          {/* Features */}
          <Route
            path={`${routes.MANAGER}/MenuManagement`}
            component={MenuManagement}
          />
          <Route
            path={`${routes.MANAGER}/StaffManagement`}
            component={StaffManagement}
          />
          <Route
            path={routes.MANAGER}
            render={() => <Redirect to={`${routes.MANAGER}/MenuManagement`} />}
            exact
          />
        </div>
      </div>
    </div>
  );
}

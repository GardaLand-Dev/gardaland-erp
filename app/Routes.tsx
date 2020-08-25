/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import { selectLoggedIn } from './reducers/authentication.reducer';
import MangerPage from './containers/ManagerPage';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpacck
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

function PrivateRoute({
  children,
  redirect,
  path,
  ...rest
}: {
  children: JSX.Element;
  path: string;
  redirect: string;
  exact?: boolean;
}) {
  const isAuthenticated = useSelector(selectLoggedIn);
  return (
    <Route
      {...rest}
      render={
        () => {
          const bool =
            redirect === routes.LOGIN ? isAuthenticated : !isAuthenticated;
          return bool ? children : <Redirect to={redirect} />;
        }
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
}
PrivateRoute.defaultProps = {
  exact: false,
};

export default function Routes() {
  return (
    <App>
      <Switch>
        {/* <PrivateRoute path={routes.HOME} redirect={routes.LOGIN} exact>
          <HomePage />
        </PrivateRoute> */}
        <PrivateRoute path={routes.LOGIN} redirect={routes.MANAGER.root} exact>
          <LoginPage />
        </PrivateRoute>
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.MANAGER.root} component={MangerPage} />
        <Route
          path={routes.ROOT}
          render={() => <Redirect to={routes.LOGIN} />}
          exact
        />
      </Switch>
    </App>
  );
}

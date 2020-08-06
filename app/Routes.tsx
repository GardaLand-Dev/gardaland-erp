/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';

// Lazily load routes and code split with webpacck
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );
const fakeAuth = {
  isAuthenticated: true,
};

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
  return (
    <Route
      {...rest}
      render={
        () => {
          const bool =
            redirect === routes.LOGIN
              ? fakeAuth.isAuthenticated
              : !fakeAuth.isAuthenticated;
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
        {/* <Route path={routes.COUNTER} component={CounterPage} /> */}
        <PrivateRoute path={routes.HOME} redirect={routes.LOGIN} exact>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path={routes.LOGIN} redirect={routes.HOME} exact>
          <LoginPage />
        </PrivateRoute>
        {/* <Route path={routes.LOGIN} component={LoginPage} exact /> */}
        <Route
          path={routes.ROOT}
          render={() => <Redirect to={routes.HOME} />}
        />
      </Switch>
    </App>
  );
}

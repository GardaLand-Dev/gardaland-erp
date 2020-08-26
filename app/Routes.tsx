/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import { selectAuthState } from './reducers/authentication.reducer';
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
function PrivateRoute2({
  children,
  path,
  ...rest
}: {
  children: JSX.Element;
  path: string;
}) {
  const authState = useSelector(selectAuthState);
  const pathHasManager = path.toLowerCase().includes('manager');
  return (
    <Route
      {...rest}
      render={
        () => {
          // console.log(authState && authState.loggedIn && ((pathHasManager && authState.asManager) || !pathHasManager));
          return authState.loggedIn &&
            ((pathHasManager && authState.asManager) || !pathHasManager) ? (
            children
          ) : (
            <Redirect to={routes.LOGIN} />
          );
        }
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
}

function LoginRoute({
  children,
  path,
  ...rest
}: {
  children: JSX.Element;
  path: string;
}) {
  const authState = useSelector(selectAuthState);
  return (
    <Route
      {...rest}
      render={() => {
        return authState.loggedIn ? (
          <Redirect
            to={authState.asManager ? routes.MANAGER.root : routes.HOME}
          />
        ) : (
          children
        );
      }}
    />
  );
}

export default function Routes() {
  return (
    <App>
      <Switch>
        <LoginRoute path={routes.LOGIN}>
          <LoginPage />
        </LoginRoute>
        <PrivateRoute2 path={routes.MANAGER.root}>
          <MangerPage />
        </PrivateRoute2>
        <PrivateRoute2 path={routes.HOME}>
          <HomePage />
        </PrivateRoute2>
        <Route
          path={routes.ROOT}
          render={() => <Redirect to={routes.LOGIN} />}
          exact
        />
      </Switch>
    </App>
  );
}

/**
 *
 * App.js
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { publicRoutes } from 'routes';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import 'bootstrap/dist/css/bootstrap.min.css';
import SnackBar from "containers/SnackBar";

const key = "global";
export default function App() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Helmet titleTemplate="Vending Machine" defaultTitle="Vending Machine">
        <meta name="description" content="Vending Machine Demo" />
      </Helmet>
        <SnackBar/>
      <main className="content">
        <Switch>
          {publicRoutes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
            <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

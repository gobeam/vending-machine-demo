/**
 *
 * App.js
 *
 */

import React from "react";
import { Helmet } from "react-helmet";

import { useInjectReducer } from "utils/injectReducer";
import reducer from "containers/App/reducer";
import { useInjectSaga } from "utils/injectSaga";
import saga from "containers/App/saga";

const key = "global";
export default function App() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  return (
    <>
      <Helmet titleTemplate="Vending Machine" defaultTitle="Vending Machine">
        <meta name="description" content="Vending Machine Demo" />
      </Helmet>
      <main className="content">This is home page</main>
    </>
  );
}

import React from "react";
import routeConfig from "./router/index";
import { useRoutes } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {useRoutes(routeConfig)}
      </PersistGate>
    </Provider>
  );
};

export default App;

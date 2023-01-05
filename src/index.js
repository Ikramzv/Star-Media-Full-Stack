import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import reducers from "./reducers/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

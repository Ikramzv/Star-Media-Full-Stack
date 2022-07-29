import React from "react";
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux'

import App from "./App";
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import reducers from "./reducers/index";


const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore(reducers , applyMiddleware(thunk))

root.render(
    <React.StrictMode>
        <Provider store={store} >
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
)
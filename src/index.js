import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore,combineReducers, applyMiddleware } from "redux";
import * as serviceWorker from './serviceWorker';
import  Thunk from 'redux-thunk'
import "./index.css";
import App from "./Container/App";
import { Rsidebar,Rpath } from "./Components/Navigation/reducers";
import { Rtables } from "./Components/Consultas/reducer";
import { Rselect } from "./Components/Navigation/Select/reducer";


const reducers = combineReducers({Rsidebar,Rpath,Rtables,Rselect})
const store = createStore(reducers, applyMiddleware(Thunk))

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'));

serviceWorker.register();

import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return store;
};

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const composingMiddlewareAndDevTools = composeEnhancers(
  applyMiddleware(...middleware)
);
// https://github.com/zalmoxisus/redux-devtools-extension#usage

const store = createStore(
  rootReducer,
  initialState,
  composingMiddlewareAndDevTools
);

console.log(store.getState());

export default store;

import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { localStorageMiddleware } from "./middleware";
import reducer from "./reducer";
import { createBrowserHistory } from "history";

import { routerMiddleware } from "react-router-redux";
// import createHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.REACT_APP_ENV === "production") {
    return applyMiddleware(myRouterMiddleware, localStorageMiddleware, thunk);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      myRouterMiddleware,
      localStorageMiddleware,
      thunk,
      createLogger()
    );
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));

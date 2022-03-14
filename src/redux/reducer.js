import { combineReducers } from "redux";
import auth from "./auth/auth.reducers";
import home from "./home/home.reducers";
import user from "./user/user.reducers";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  auth,
  home,
  user,
  router: routerReducer,
});

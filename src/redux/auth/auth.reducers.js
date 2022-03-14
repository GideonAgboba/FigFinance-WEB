import * as actionTypes from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

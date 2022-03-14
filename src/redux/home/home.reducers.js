import * as actionTypes from "./home.types";

const INITIAL_STATE = {
  events: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}

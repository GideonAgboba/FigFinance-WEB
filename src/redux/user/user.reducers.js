import * as actionTypes from './user.types';

const INITIAL_STATE = {
    history: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
}
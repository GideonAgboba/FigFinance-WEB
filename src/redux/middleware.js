import setAuthToken from "./setAuthToken";
import { LOGOUT_USER, SET_TOKEN } from "./auth/auth.types";

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === SET_TOKEN) {
    if (!action.error) {
      setAuthToken(action.payload);
    }
  } else if (action.type === LOGOUT_USER) {
    setAuthToken(null);
  }

  next(action);
};

export { localStorageMiddleware };

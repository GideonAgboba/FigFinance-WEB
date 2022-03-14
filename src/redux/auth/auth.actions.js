import * as actionTypes from "./auth.types";
import Axios from "../axios";

// register
export const register =
  (formDate, _success = () => {}, _error = () => {}) =>
  async (dispatch) => {
    await Axios.post("/auth/signup", formDate)
      .then(async (response) => {
        const { data } = response?.data;
        const { user, token } = data;
        await dispatch({
          type: actionTypes.SET_USER,
          payload: user ? user : null,
        });
        await dispatch({
          type: actionTypes.SET_TOKEN,
          payload: token ? token : null,
        });
        _success(user);
      })
      .catch((err) => {
        _error(err);
      });

    return;
  };

// login
export const login =
  (formDate, _success = () => {}, _error = () => {}) =>
  async (dispatch) => {
    await Axios.post("/auth/login", formDate)
      .then(async (response) => {
        const { data } = response?.data;
        const { user, token } = data;
        await dispatch({
          type: actionTypes.SET_USER,
          payload: user ? user : null,
        });
        await dispatch({
          type: actionTypes.SET_TOKEN,
          payload: token ? token : null,
        });
        _success(user);
      })
      .catch((err) => {
        _error(err);
      });

    return;
  };

// admin login
export const adminLogin =
  (formDate, _success = () => {}, _error = () => {}) =>
  async (dispatch) => {
    await Axios.post("/auth/admin/login", formDate)
      .then(async (response) => {
        const { data } = response?.data;
        const { admin, token } = data;
        await dispatch({
          type: actionTypes.SET_USER,
          payload: admin ? admin : null,
        });
        await dispatch({
          type: actionTypes.SET_TOKEN,
          payload: token ? token : null,
        });
        _success(admin);
      })
      .catch((err) => {
        _error(err);
      });

    return;
  };

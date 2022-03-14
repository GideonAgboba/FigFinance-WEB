import * as actionTypes from "./home.types";
import Axios from "../axios";

// plans
export const getEvents =
  (_success = () => {}, _error = () => {}) =>
  async (dispatch) => {
    await Axios.get("/event")
      .then(async (response) => {
        const { data } = response;
        const { results } = data?.data;
        await dispatch({
          type: actionTypes.SET_EVENTS,
          payload: results ? results : [],
        });
        _success(results);
      })
      .catch((err) => {
        _error(err);
      });

    return;
  };

// subscribe
export const subscribe =
  (formDate, _success = () => {}, _error = () => {}) =>
  async (dispatch) => {
    await Axios.post("/subscribe/create", formDate)
      .then(async (response) => {
        const { data } = response?.data;
        _success(data);
      })
      .catch((err) => {
        _error(err);
      });

    return;
  };

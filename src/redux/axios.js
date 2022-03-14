import axios from "axios";
import { store } from "./store";
import { LOGOUT_USER } from "./auth/auth.types";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast(error.response?.data?.message || "Authentication expired", {
        position: "top-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      store.dispatch({
        type: LOGOUT_USER,
      });
    } else if (error.response.status === 400) {
      toast(
        error.response?.data?.message ||
          "Opps! Something went wrong. Try again",
        {
          position: "top-right",
          type: "error",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast(error.response?.data?.message || "Opps! something went wrong.", {
        position: "top-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return error;
  }
);

export default instance;

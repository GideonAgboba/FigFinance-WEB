import Axios from './axios';

const setAuthToken = async token => {
  // check for token
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
import { AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const authUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const authAction = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(AUTHENTICATE_USER, true));
    const request = await axios.post(url, data);
    localStorage.setItem('x-access-token', request.data.token);
    dispatch(authUserAction('SUCCESS', request.data));
    dispatch(loading(AUTHENTICATE_USER, false));
  } catch (error) {
    dispatch(loading(AUTHENTICATE_USER, false));
    dispatch(authUserAction('ERROR', error.response.data));
  }
};

export default authAction;

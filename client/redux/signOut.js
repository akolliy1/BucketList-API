import { AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const authUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const authAction = () => async (dispatch) => {
  try {
    dispatch(loading(AUTHENTICATE_USER, true));
    localStorage.removeItem('x-access-token');
    await axios.post('/logout');
    dispatch(authUserAction('ERROR', ''));
    dispatch(loading(AUTHENTICATE_USER, false));
  } catch (error) {
    dispatch(loading(AUTHENTICATE_USER, false));
    dispatch(authUserAction('ERROR', error.response.data));
  }
};

export default authAction;

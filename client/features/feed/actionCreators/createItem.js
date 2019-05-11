import { CREATE_BUCKET_ITEM } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const postUserAddressAction = (type, data) => ({
  type: `${CREATE_BUCKET_ITEM}_${type}`,
  data,
});

const postUserAddress = (id, data) => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(CREATE_BUCKET_ITEM, true));
      const request = await axios({
        method: 'POST',
        url: `/bucketlists/${id}/items`,
        data,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch(postUserAddressAction('SUCCESS', request.data));
      dispatch(loading(CREATE_BUCKET_ITEM, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(postUserAddressAction('ERROR', error.response.data));
    dispatch(loading(CREATE_BUCKET_ITEM, false));
  }
};

export default postUserAddress;

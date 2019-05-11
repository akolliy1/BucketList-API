import { FETCH_A_BUCKET_LIST_ITEMS } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const getBucketItemsAction = (type, data) => ({
  type: `${FETCH_A_BUCKET_LIST_ITEMS}_${type}`,
  data,
});

const getBucketItems = id => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(FETCH_A_BUCKET_LIST_ITEMS, true));
      const request = await axios({
        method: 'GET',
        url: `/bucketlists/${id}`,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch(getBucketItemsAction('SUCCESS', request.data));
      dispatch(loading(FETCH_A_BUCKET_LIST_ITEMS, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(getBucketItemsAction('ERROR', error.response.data));
    dispatch(loading(FETCH_A_BUCKET_LIST_ITEMS, false));
  }
};

export default getBucketItems;

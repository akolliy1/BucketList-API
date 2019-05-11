import { FETCH_BUCKET_LIST } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const fetchBucketListAction = (type, data) => ({
  type: `${FETCH_BUCKET_LIST}_${type}`,
  data,
});

const fetchBucketList = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(FETCH_BUCKET_LIST, true));
      const request = await axios({
        method: 'GET',
        url: '/bucketlists/',
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch(fetchBucketListAction('SUCCESS', request.data));
      dispatch(loading(FETCH_BUCKET_LIST, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(fetchBucketListAction('ERROR', error.response.data));
    dispatch(loading(FETCH_BUCKET_LIST, false));
  }
};

export default fetchBucketList;

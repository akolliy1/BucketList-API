import { FETCH_BUCKET_LIST } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const fetchUserBucketListAction = (type, data) => ({
  type: `${FETCH_BUCKET_LIST}_${type}`,
  data,
});

const fetchUserBucketList = () => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUCKET_LIST, true));
    const request = await axios({
      method: 'GET',
      url: '/bucketlists/',
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(fetchUserBucketListAction('SUCCESS', request.data));
    dispatch(loading(FETCH_BUCKET_LIST, false));
  } catch (error) {
    dispatch(fetchUserBucketListAction('ERROR', error.response.data));
    dispatch(loading(FETCH_BUCKET_LIST, false));
  }
};

export default fetchUserBucketList;

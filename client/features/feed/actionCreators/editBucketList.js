import { EDIT_A_BUCKET_LIST } from 'Redux/actionTypes';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

import fetchBucketList from './fetchBucketList';

const editUserBucketListAction = (type, data) => ({
  type: `${EDIT_A_BUCKET_LIST}_${type}`,
  data,
});

const editUserBucketList = (id, data) => async (dispatch) => {
  try {
    dispatch(loading(EDIT_A_BUCKET_LIST, true));
    const request = await axios({
      method: 'PUT',
      data,
      url: `/bucketlists/${id}`,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    fetchBucketList();
    dispatch(editUserBucketListAction('SUCCESS', request.data));
    dispatch(loading(EDIT_A_BUCKET_LIST, false));
  } catch (error) {
    dispatch(editUserBucketListAction('ERROR', error.response.data));
    dispatch(loading(EDIT_A_BUCKET_LIST, false));
  }
};

export default editUserBucketList;

import { EDIT_A_BUCKET_LIST } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

const editBucketListAction = (type, data) => ({
  type: `${EDIT_A_BUCKET_LIST}_${type}`,
  data,
});

const editBucketList = (id, data) => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
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
      const req = await axios({
        method: 'GET',
        url: '/bucketlists/',
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch({ type: 'FETCH_BUCKET_LIST_SUCCESS', data: req.data });
      dispatch(editBucketListAction('SUCCESS', request.data));
      dispatch(loading(EDIT_A_BUCKET_LIST, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(editBucketListAction('ERROR', error.response.data));
    dispatch(loading(EDIT_A_BUCKET_LIST, false));
  }
};

export default editBucketList;

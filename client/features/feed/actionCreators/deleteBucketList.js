import { DELETE_A_BUCKET_LIST } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

const deleteBucketListAction = (type, data) => ({
  type: `${DELETE_A_BUCKET_LIST}_${type}`,
  data,
});

const deleteBucketList = listId => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(DELETE_A_BUCKET_LIST, true));
      const request = await axios({
        method: 'DELETE',
        url: `/bucketlists/${listId}`,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch(deleteBucketListAction('SUCCESS', request.data));
      dispatch(loading(DELETE_A_BUCKET_LIST, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(deleteBucketListAction('ERROR', error.response.data));
    dispatch(loading(DELETE_A_BUCKET_LIST, false));
  }
};

export default deleteBucketList;

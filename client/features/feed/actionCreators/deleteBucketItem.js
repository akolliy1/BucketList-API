import { DELETE_A_BUCKET_ITEM } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

const deleteBucketItemAction = (type, data) => ({
  type: `${DELETE_A_BUCKET_ITEM}_${type}`,
  data,
});

const deleteBucketItem = (itemId, listId) => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(DELETE_A_BUCKET_ITEM, true));
      const request = await axios({
        method: 'DELETE',
        url: `/bucketlists/${listId}/items/${itemId}`,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      const req = await axios({
        method: 'GET',
        url: `/bucketlists/${listId}`,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json',
        }
      });
      dispatch({ type: 'FETCH_A_BUCKET_LIST_ITEMS', data: req.data });
      dispatch(deleteBucketItemAction('SUCCESS', request.data));
      dispatch(loading(DELETE_A_BUCKET_ITEM, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(deleteBucketItemAction('ERROR', error.response.data));
    dispatch(loading(DELETE_A_BUCKET_ITEM, false));
  }
};

export default deleteBucketItem;

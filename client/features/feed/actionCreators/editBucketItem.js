import { EDIT_A_BUCKET_ITEM } from 'Redux/actionTypes';
import isExpired from 'Utilities/isExpired';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

const editBucketItemAction = (type, data) => ({
  type: `${EDIT_A_BUCKET_ITEM}_${type}`,
  data,
});

const editBucketItem = (itemId, data, listId) => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    if (!isExpired(authReducer.user.token)) {
      dispatch(loading(EDIT_A_BUCKET_ITEM, true));
      const request = await axios({
        method: 'PUT',
        data,
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
      dispatch(editBucketItemAction('SUCCESS', request.data));
      dispatch(loading(EDIT_A_BUCKET_ITEM, false));
    } else {
      dispatch({ type: 'AUTHENTICATE_USER_ERROR', data: '' });
    }
  } catch (error) {
    dispatch(editBucketItemAction('ERROR', error.response.data));
    dispatch(loading(EDIT_A_BUCKET_ITEM, false));
  }
};

export default editBucketItem;

import { CREATE_BUCKET_LIST } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const postUserAddressAction = (type, data) => ({
  type: `${CREATE_BUCKET_LIST}_${type}`,
  data,
});

const postUserAddress = data => async (dispatch) => {
  try {
    dispatch(loading(CREATE_BUCKET_LIST, true));
    const request = await axios({
      method: 'POST',
      url: '/bucketlists/',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(postUserAddressAction('SUCCESS', request.data));
    dispatch(loading(CREATE_BUCKET_LIST, false));
  } catch (error) {
    dispatch(postUserAddressAction('ERROR', error.response.data));
    dispatch(loading(CREATE_BUCKET_LIST, false));
  }
};

export default postUserAddress;

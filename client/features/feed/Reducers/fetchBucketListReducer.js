import { FETCH_BUCKET_LIST } from 'Redux/actionTypes';

const initialState = {
  fetched: false,
  data: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_BUCKET_LIST}_SUCCESS`:
      return {
        ...state,
        fetched: true,
        data: action.data.data,
        errorMessage: ''
      };

    case `${FETCH_BUCKET_LIST}_ERROR`:
      return {
        ...state,
        fetched: true,
        data: {},
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};

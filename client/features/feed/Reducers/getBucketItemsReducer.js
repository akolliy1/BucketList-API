import { FETCH_A_BUCKET_LIST_ITEMS } from 'Redux/actionTypes';

const initialState = {
  fetched: false,
  data: { items: [] },
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_A_BUCKET_LIST_ITEMS}_SUCCESS`:
      return {
        ...state,
        fetched: true,
        data: action.data.data,
        errorMessage: ''
      };

    case `${FETCH_A_BUCKET_LIST_ITEMS}_ERROR`:
      return {
        ...state,
        fetched: true,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};

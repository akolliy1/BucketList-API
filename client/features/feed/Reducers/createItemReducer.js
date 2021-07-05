import { CREATE_BUCKET_ITEM } from 'Redux/actionTypes';

const initialState = {
  created: false,
  data: [],
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_BUCKET_ITEM}_SUCCESS`:
      return {
        ...state,
        created: true,
        data: action.data,
        errorMessage: ''
      };

    case `${CREATE_BUCKET_ITEM}_ERROR`:
      return {
        ...state,
        created: true,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};

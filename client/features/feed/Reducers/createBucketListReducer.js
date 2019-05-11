import { CREATE_BUCKET_LIST } from 'Redux/actionTypes';

const initialState = {
  created: false,
  data: [],
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_BUCKET_LIST}_SUCCESS`:
      return {
        ...state,
        created: true,
        data: action.data,
        errorMessage: ''
      };

    case `${CREATE_BUCKET_LIST}_ERROR`:
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

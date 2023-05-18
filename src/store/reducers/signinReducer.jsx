import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from "../actions/signinAction";

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
};

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.accessToken,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        },
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signinReducer;

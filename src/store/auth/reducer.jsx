import {
  //sign up
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  //sign in
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,

  //current user
  GET_CURRENT_USER,
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Signup reducers
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Signin reducers
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

    // Get Current User reducer
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

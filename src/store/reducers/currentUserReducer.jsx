import { GET_CURRENT_USER } from "../actions/currentUserAction";

const initialState = {
  currentUser: null,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentUserReducer;

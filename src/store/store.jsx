import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducers/signupReducer";
import signinReducer from "./reducers/signinReducer";
import currentUserReducer from "./reducers/currentUserReducer";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    currentUser: currentUserReducer,
  },
});

export default store;

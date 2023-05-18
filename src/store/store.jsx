import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducers/signupReducer";
import signinReducer from "./reducers/signinReducer";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import topicReducer from "./slice/topicSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    topics: topicReducer,
  },
});

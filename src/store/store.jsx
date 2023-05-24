import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import topicReducer from "./slice/topicSlice";
import commentReducer from "./slice/commentSlice";
import resourceReducer from "./slice/resourceSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    topics: topicReducer,
    comments: commentReducer,
    resources: resourceReducer,
  },
});

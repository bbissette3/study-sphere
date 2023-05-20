import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import topicReducer from "./slice/topicSlice";
import userTopicReducer from "./slice/userTopicSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    topics: topicReducer,
    userTopics: userTopicReducer,
  },
});

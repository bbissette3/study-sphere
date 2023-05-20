import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

const initialState = {
  userTopics: [],
  status: "idle",
  error: null,
};

// Async thunk for getting UserTopics
export const fetchUserTopics = createAsyncThunk(
  "userTopics/fetchUserTopics",
  async (_, thunkAPI) => {
    const accessToken = thunkAPI.getState().user.accessToken;
    const response = await axios.get("/api/userTopics", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

// Async thunk for adding a user to a topic
export const addUserToTopic = createAsyncThunk(
  "userTopics/addUserToTopic",
  async (topicId, thunkAPI) => {
    const accessToken = thunkAPI.getState().user.accessToken;
    const response = await axios.post(
      `/api/userTopics/${topicId}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  }
);

// Async thunk for removing a user from a topic
export const removeUserFromTopic = createAsyncThunk(
  "userTopics/removeUserFromTopic",
  async (topicId, thunkAPI) => {
    const accessToken = thunkAPI.getState().user.accessToken;
    const response = await axios.delete(`/api/userTopics/${topicId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

const userTopicSlice = createSlice({
  name: "userTopics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userTopics = action.payload;
      })
      .addCase(fetchUserTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserToTopic.fulfilled, (state, action) => {
        state.userTopics.push(action.payload);
      })
      .addCase(removeUserFromTopic.fulfilled, (state, action) => {
        state.userTopics = state.userTopics.filter(
          (topic) => topic.id !== action.payload.id
        );
      });
  },
});

export default userTopicSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

// Add user to topic
export const addUserToTopic = createAsyncThunk(
  "userTopic/addUserToTopic",
  async (topicId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `/api/userTopics/${topicId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Remove user from topic
export const removeUserFromTopic = createAsyncThunk(
  "userTopic/removeUserFromTopic",
  async (topicId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/userTopics/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkUserSubscription = createAsyncThunk(
  "userTopic/checkUserSubscription",
  async (topicId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/userTopics/${topicId}/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userTopicSlice = createSlice({
  name: "userTopic",
  initialState: {
    topics: [],
    loading: false,
    error: null,
    subscriptionStatus: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add user to topic reducers
      .addCase(addUserToTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserToTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload.topicId);
      })
      .addCase(addUserToTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Remove user from topic reducers
      .addCase(removeUserFromTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserFromTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload.topicId
        );
      })
      .addCase(removeUserFromTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Check user subscription
    builder
      .addCase(checkUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionStatus[action.payload.topicId] =
          action.payload.isSubscribed;
      })

      .addCase(checkUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userTopicSlice.reducer;

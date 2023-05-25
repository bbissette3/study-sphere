import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

const initialState = {
  topics: [],
  selectedTopic: null,
  status: "idle",
  error: null,
};

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("/api/topics", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

export const fetchUserTopics = createAsyncThunk(
  "topics/fetchUserTopics",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("/api/topics/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

export const fetchUserSubscribedTopics = createAsyncThunk(
  "topics/fetchUserSubscribedTopics",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("/api/topics/user/subscribed", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

export const fetchTopicById = createAsyncThunk(
  "topics/fetchTopicById",
  async (id, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`/api/topics/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

export const addTopic = createAsyncThunk(
  "topics/addTopic",
  async ({ title, subject, description }) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "/api/topics",
      { title, subject, description },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.topic;
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async ({ id, ...topicData }) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(`/api/topics/${id}`, topicData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/deleteTopic",
  async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(`/api/topics/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //all topics
      .addCase(fetchTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //user topics
      .addCase(fetchUserTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchUserTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //subscribed topics
      .addCase(fetchUserSubscribedTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserSubscribedTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchUserSubscribedTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //topics by id
      .addCase(fetchTopicById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTopic = action.payload;
      })
      .addCase(fetchTopicById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //add topic
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload);
      })
      //update topic
      .addCase(updateTopic.fulfilled, (state, action) => {
        const index = state.topics.findIndex(
          (topic) => topic.id === action.payload.id
        );
        if (index !== -1) {
          state.topics[index] = action.payload;
        }
      })
      //delete topic
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload.id
        );
      });
  },
});

export default topicSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTopicById } from "./topicSlice";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

export const createComment = createAsyncThunk(
  "comments/create",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { text, userId, topicId } = payload;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `/api/comments/${topicId}`,
        {
          text,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(fetchTopicById(topicId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create comment
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;

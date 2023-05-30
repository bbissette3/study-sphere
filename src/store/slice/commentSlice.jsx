import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTopicById } from "./topicSlice";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

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

export const updateComment = createAsyncThunk(
  "comments/update",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { text, commentId, topicId } = payload;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `/api/comments/${commentId}`,
        { text },
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

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { commentId, topicId } = payload;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
      })
      // update comment
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete comment
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments.splice(index, 1);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;

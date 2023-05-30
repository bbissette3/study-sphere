import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTopicById } from "./topicSlice";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const createResource = createAsyncThunk(
  "resources/createResource",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { url, userId, topicId } = payload;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/api/resources",
        {
          url,
          userId,
          topicId,
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

export const deleteResource = createAsyncThunk(
  "resources/delete",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { resourceId, topicId } = payload;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/resources/${resourceId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(fetchTopicById(topicId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    status: "idle",
    error: null,
    resources: [],
  },
  extraReducers: (builder) => {
    builder
      //add resource
      .addCase(createResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched resources to the array
        state.resources.push(action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete resource
      .addCase(deleteResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.resources.findIndex(
          (resource) => resource.id === action.payload.id
        );
        if (index !== -1) {
          state.resources.splice(index, 1);
        }
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default resourceSlice.reducer;

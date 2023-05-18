import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

export const signupRequest = createAsyncThunk(
  "user/signup",
  async (userData) => {
    const response = await axios.post("/api/users/signup", userData);
    return response.data;
  }
);

export const signinRequest = createAsyncThunk(
  "user/signin",
  async (userData) => {
    const response = await axios.post("/api/users/login", userData);
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token) => {
    const response = await axios.get("/api/users/verifyToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signupRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signinRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(signinRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default userSlice.reducer;

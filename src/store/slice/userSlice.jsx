import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

// Sign up
export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }) => {
    try {
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Sign in
export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }) => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get current user
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token) => {
    try {
      const response = await axios.get("/api/users/verifyToken", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Signup reducers
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Signin reducers
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Get current user reducer
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Sign up
export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sign in
export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

// Edit user
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userId, username, email, password }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `/api/users/${userId}`,
        {
          username,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    localStorage.removeItem("accessToken");
    return null;
  } catch (error) {
    throw new Error("Could not logout");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    isChecking: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup reducers
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
        state.error = action.payload;
      })
      // Signin reducers
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
        state.error = action.payload;
      })
      // Get current user reducer
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isChecking = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isChecking = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isChecking = false;
      })
      //edit user
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout user
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default userSlice.reducer;

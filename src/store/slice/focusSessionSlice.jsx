import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

// Async action to fetch all focus sessions
export const fetchUserFocusSessions = createAsyncThunk(
  "focusSessions/fetchUserFocusSessions",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("/api/focusSessions/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

// Async action to add a new focus session
export const addFocusSession = createAsyncThunk(
  "focusSessions/addFocusSession",
  async (newSession, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`/api/focusSessions/`, newSession, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
);

// Async action to delete a focus session
export const deleteFocusSession = createAsyncThunk(
  "focusSessions/deleteFocusSession",
  async (id, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios.delete(`/api/focusSessions/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return id;
  }
);

const focusSessionsSlice = createSlice({
  name: "focusSessions",
  initialState: {
    focusSessions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFocusSessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFocusSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.focusSessions = action.payload;
      })
      .addCase(fetchUserFocusSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFocusSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFocusSession.fulfilled, (state, action) => {
        state.focusSessions = [...state.focusSessions, action.payload];
        state.status = "succeeded";
      })
      .addCase(addFocusSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteFocusSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFocusSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.focusSessions = state.focusSessions.filter(
          (session) => session.id !== action.payload
        );
      })
      .addCase(deleteFocusSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default focusSessionsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    const response = await axios.post(
      "/api/focusSessions/:topicId",
      newSession,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
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

// Define the initial state for the focus sessions slice
const initialState = {
  focusSessions: [],
  status: "idle",
  error: null,
};

const focusSessionsSlice = createSlice({
  name: "focusSessions",
  initialState,
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
      .addCase(addFocusSession.fulfilled, (state, action) => {
        state.focusSessions.push(action.payload);
      })
      .addCase(deleteFocusSession.fulfilled, (state, action) => {
        state.focusSessions = state.focusSessions.filter(
          (session) => session.id !== action.payload
        );
      });
  },
});

export default focusSessionsSlice.reducer;

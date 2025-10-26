import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../helpers/config';

// Async thunk for creating a mood board
export const createMoodBoard = createAsyncThunk(
  'moodBoard/createMoodBoard',
  async (moodBoardData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/mood-boards`, moodBoardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for updating a mood board
export const updateMoodBoard = createAsyncThunk(
  'moodBoard/updateMoodBoard',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/mood-boards/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for fetching a mood board
export const fetchMoodBoard = createAsyncThunk(
  'moodBoard/fetchMoodBoard',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/mood-boards/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for sharing a mood board
export const shareMoodBoard = createAsyncThunk(
  'moodBoard/shareMoodBoard',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/mood-boards/share/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  moodBoards: [],
  currentMoodBoard: null,
  sharedMoodBoard: null,
  loading: false,
  error: null,
};

const moodBoardSlice = createSlice({
  name: 'moodBoard',
  initialState,
  reducers: {
    clearCurrentMoodBoard: (state) => {
      state.currentMoodBoard = null;
      state.error = null;
    },
    clearSharedMoodBoard: (state) => {
      state.sharedMoodBoard = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create mood board
      .addCase(createMoodBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMoodBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.moodBoards.push(action.payload.data);
      })
      .addCase(createMoodBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update mood board
      .addCase(updateMoodBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMoodBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMoodBoard = action.payload.data;
      })
      .addCase(updateMoodBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch mood board
      .addCase(fetchMoodBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoodBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMoodBoard = action.payload.data;
      })
      .addCase(fetchMoodBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Share mood board
      .addCase(shareMoodBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareMoodBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.sharedMoodBoard = action.payload.data;
      })
      .addCase(shareMoodBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentMoodBoard, clearSharedMoodBoard } = moodBoardSlice.actions;
export default moodBoardSlice.reducer;
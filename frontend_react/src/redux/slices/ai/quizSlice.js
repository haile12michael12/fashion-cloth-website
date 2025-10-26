import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../helpers/config';

// Async thunk for fetching style quizzes
export const fetchStyleQuizzes = createAsyncThunk(
  'quiz/fetchStyleQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/style-quizzes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for submitting quiz responses
export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ id, responses }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/style-quizzes/${id}/submit`, { responses });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for fetching user's style profile
export const fetchStyleProfile = createAsyncThunk(
  'quiz/fetchStyleProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/style-profile`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  quizzes: [],
  currentQuiz: null,
  styleProfile: null,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    clearStyleProfile: (state) => {
      state.styleProfile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch style quizzes
      .addCase(fetchStyleQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyleQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.data;
      })
      .addCase(fetchStyleQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit quiz
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.styleProfile = action.payload.data.style_profile;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch style profile
      .addCase(fetchStyleProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyleProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.styleProfile = action.payload.data;
      })
      .addCase(fetchStyleProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentQuiz, clearStyleProfile } = quizSlice.actions;
export default quizSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../helpers/config';

// Async thunk for uploading try-on image
export const uploadTryOnImage = createAsyncThunk(
  'tryOn/uploadTryOnImage',
  async ({ image, pictureId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('picture_id', pictureId);
      
      const response = await axios.post(`${BASE_URL}/api/tryon/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for getting try-on result
export const getTryOnResult = createAsyncThunk(
  'tryOn/getTryOnResult',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tryon/result/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  tryOnSession: null,
  result: null,
  loading: false,
  error: null,
};

const tryOnSlice = createSlice({
  name: 'tryOn',
  initialState,
  reducers: {
    clearTryOnSession: (state) => {
      state.tryOnSession = null;
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload try-on image
      .addCase(uploadTryOnImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadTryOnImage.fulfilled, (state, action) => {
        state.loading = false;
        state.tryOnSession = action.payload;
      })
      .addCase(uploadTryOnImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get try-on result
      .addCase(getTryOnResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTryOnResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getTryOnResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTryOnSession } = tryOnSlice.actions;
export default tryOnSlice.reducer;
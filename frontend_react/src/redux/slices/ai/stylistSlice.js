import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../helpers/config';

// Async thunk for getting outfit recommendations
export const getOutfitRecommendations = createAsyncThunk(
  'aiStylist/getOutfitRecommendations',
  async ({ image, mood }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      if (mood) formData.append('mood', mood);
      
      const response = await axios.post(`${BASE_URL}/api/ai-stylist/recommend`, formData, {
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

// Async thunk for getting color recommendations
export const getColorRecommendations = createAsyncThunk(
  'aiStylist/getColorRecommendations',
  async (image, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      const response = await axios.post(`${BASE_URL}/api/ai-stylist/recommend-color`, formData, {
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

const initialState = {
  recommendations: null,
  loading: false,
  error: null,
};

const aiStylistSlice = createSlice({
  name: 'aiStylist',
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.recommendations = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Outfit recommendations
      .addCase(getOutfitRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutfitRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(getOutfitRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Color recommendations
      .addCase(getColorRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getColorRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(getColorRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRecommendations } = aiStylistSlice.actions;
export default aiStylistSlice.reducer;
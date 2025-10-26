import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../helpers/config';

// Async thunk for creating a look book
export const createLookBook = createAsyncThunk(
  'lookBook/createLookBook',
  async (lookBookData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', lookBookData.title);
      formData.append('description', lookBookData.description);
      formData.append('image', lookBookData.image);
      formData.append('is_public', lookBookData.isPublic);
      
      const response = await axios.post(`${BASE_URL}/api/look-books`, formData, {
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

// Async thunk for adding items to a look book
export const addLookBookItems = createAsyncThunk(
  'lookBook/addLookBookItems',
  async ({ id, items }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/look-books/${id}/items`, { items });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for fetching a look book
export const fetchLookBook = createAsyncThunk(
  'lookBook/fetchLookBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/look-books/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for fetching look books
export const fetchLookBooks = createAsyncThunk(
  'lookBook/fetchLookBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/look-books`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  lookBooks: [],
  currentLookBook: null,
  loading: false,
  error: null,
};

const lookBookSlice = createSlice({
  name: 'lookBook',
  initialState,
  reducers: {
    clearCurrentLookBook: (state) => {
      state.currentLookBook = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create look book
      .addCase(createLookBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLookBook.fulfilled, (state, action) => {
        state.loading = false;
        state.lookBooks.push(action.payload.data);
      })
      .addCase(createLookBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add look book items
      .addCase(addLookBookItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLookBookItems.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLookBook = action.payload.data;
      })
      .addCase(addLookBookItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch look book
      .addCase(fetchLookBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLookBook.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLookBook = action.payload.data;
      })
      .addCase(fetchLookBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch look books
      .addCase(fetchLookBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLookBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.lookBooks = action.payload.data;
      })
      .addCase(fetchLookBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentLookBook } = lookBookSlice.actions;
export default lookBookSlice.reducer;